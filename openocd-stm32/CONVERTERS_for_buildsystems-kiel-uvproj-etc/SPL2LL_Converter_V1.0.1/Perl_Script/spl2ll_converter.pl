#  ******************************************************************************
#  * @file    spl2ll_converter.pl
#  * @author  MCD Application Team
#  * @version V1.0.1
#  * @date    21-November-2017
#  * @brief   Migrate user code source based on SPL to LL API
#  ******************************************************************************
#  * @attention
#  *
#  * <h2><center>&copy; Copyright (c) 2017 STMicroelectronics International N.V. 
#  * All rights reserved.</center></h2>
#  *
#  * Redistribution and use in source and binary forms, with or without 
#  * modification, are permitted, provided that the following conditions are met:
#  *
#  * 1. Redistribution of source code must retain the above copyright notice, 
#  *    this list of conditions and the following disclaimer.
#  * 2. Redistributions in binary form must reproduce the above copyright notice,
#  *    this list of conditions and the following disclaimer in the documentation
#  *    and/or other materials provided with the distribution.
#  * 3. Neither the name of STMicroelectronics nor the names of other 
#  *    contributors to this software may be used to endorse or promote products 
#  *    derived from this software without specific written permission.
#  * 4. This software, including modifications and/or derivative works of this 
#  *    software, must execute solely and exclusively on microcontroller or
#  *    microprocessor devices manufactured by or for STMicroelectronics.
#  * 5. Redistribution and use of this software other than as permitted under 
#  *    this license is void and will automatically terminate your rights under 
#  *    this license. 
#  *
#  * THIS SOFTWARE IS PROVIDED BY STMICROELECTRONICS AND CONTRIBUTORS "AS IS" 
#  * AND ANY EXPRESS, IMPLIED OR STATUTORY WARRANTIES, INCLUDING, BUT NOT 
#  * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
#  * PARTICULAR PURPOSE AND NON-INFRINGEMENT OF THIRD PARTY INTELLECTUAL PROPERTY
#  * RIGHTS ARE DISCLAIMED TO THE FULLEST EXTENT PERMITTED BY LAW. IN NO EVENT 
#  * SHALL STMICROELECTRONICS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
#  * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
#  * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, 
#  * OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
#  * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
#  * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
#  * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#  *
#  ******************************************************************************

#!/usr/bin/perl
use strict;
no warnings 'uninitialized';
use lib "Modules"; #add the special perl libraries in Modules subdirectory
use XML::Twig;
use File::Find;
use File::Path qw( make_path rmtree );
use File::Copy qw( copy );
use Getopt::Long;
use Term::ANSIColor;
use Scalar::Util qw(looks_like_number);
use if ($^O eq "MSWin32"), 'Win32::Console::ANSI';
use List::MoreUtils qw(uniq);
use File::Copy::Recursive qw(dircopy);
use Fcntl qw(:flock);

# Possible C syntax types to be processed
use constant {
              INCLUDE   => 0,
              STRUCTURE => 1,
              FUCNTION  => 2,
              LITERAL   => 3
             };

# Status values
use constant {
              PASS          => 'PASS',
              FAIL          => 'FAIL',
              ERROR         => 'ERROR',
              AUTORIZED     => 'AUTHORIZED',
              NOT_AUTORIZED => 'NOT AUTHORIZED',
              YES           => 'yes',
              NO            => 'no',
              TRUE          => 1,
              FALSE         => 0
             };

# Internal constants
use constant {
              FIRST_ATTEMPT          => 0,
              SINGLE_LINE            => 0,
              MULTI_LINE_FIRST_STEP  => 1,
              MULTI_LINE_SECOND_STEP => 2,
              VERSION                => "SPL2LL-Converter V1.0.1",
              COPYRIGHTS             => "Copyright(c) 2017 STMicroelectronics",
              ALL                    => 'ALL',
              TERMINAL               => 'TERMINAL',
              FILE                   => 'FILE'
             };

# Migration type constant
use constant {
              IN_SERIE      => 0,
              CROSS_SERIE   => 1
             };

# XML keywords
use constant {
              XML_OP_EQU    => 'EQU',
              XML_OP_ADD    => 'ADD',
              XML_OP_UPD    => 'UPD',
              XML_OP_DEL    => 'DEL',
              XML_OP_CPY    => 'CPY',
              XML_OP_0      => '@',
              XML_OP_1      => '=',
              XML_CMD       => 'CMD',
              XML_LITERAL   => 'LITERAL',
              XML_NAME      => 'NAME',
              XML_LOG       => 'LOG',
              XML_NA        => 'N/A',
              XML_SPL       => 'SPL',
              XML_LL        => 'LL',
              XML_EXCLUDE   => 'EXCLUDE',
              XML_AVAILABLE => 'AVAILABLE'
             };

# Messages
use constant {
              MSG_SUCCES        => "\n\n\n              ===============>>> Successful migration <<<===============\n\n\n",
              MSG_FAIL          => "\n\n\n              ==============>>> Unsuccessful migration <<<==============\n\n\n",
              MSG_EMPTY         => "",
              MSG_NOCHANGE      => "NO CHANGE",
              MSG_DONE          => "UPDATED",
              MSG_ERROR_STRUCT  => "structure field is not available for the target STM32 serie",
              MSG_ERROR_LITERAL => "expression is not available for the target STM32 serie",
              MSG_ERROR_FUNC    => "function is not available for the target STM32 serie"
             };

# Get start time
my $time_start = time();

my $database_path         = "../Database/STM32_PPP_XML/";
my $include_database_path = "../Database/STM32_PPP_XML/includes.xml";
my $ppp_ver_database_path = "../Database/STM32_PPP_XML/ppp_versions.xml";
my $legacy_path           = "../Database/Legacy/";
my $hal_conf_path         = "../Database/stm32xxxx_hal_conf/";

# Get database xml files
my @database_files = getDatabasefiles($database_path);

# Get arguments provided by user
my ($targetSRC, $targetDST, $in_dir, $out_dir, $cmd_header, $cmd_color);
getArguments(\$targetSRC, \$targetDST, \$in_dir, \$out_dir, \$cmd_header, \$cmd_color);

# Read database SPL functions and SPL/LL literals
my @database_spl_functions;
my @database_spl_literals;
getDatabasedefinition($targetSRC, $targetDST, \@database_spl_functions, \@database_spl_literals);
# Remove duplicated functions
@database_spl_functions = uniq(@database_spl_functions);
# Sort the array in order to place not available expressions in the end of the array
@database_spl_literals = sort @database_spl_literals;

# Find .c/.h files under source directory
my @src_files = getSrcfiles($in_dir);

# print user information
printCommandlineinfo($targetSRC, $targetDST, $in_dir, $out_dir, scalar @src_files, $cmd_header);

# Copy SPL legacy source files
copyLegacyfiles($legacy_path, $out_dir);

# Log components
my @log_all_lines;
my $all_warnings = 0;
my $all_errors = 0;
my $nochange_files = 0;
my $var_counter = 0;

foreach my $file (@src_files)
{
    # No upgrading for system file, user needs to use the one available under CMSIS device
    # stm32xxxx_conf.h replaced with stm32xxxx_hal_conf.h and ll_includes.h
    if ((!grep /system_stm32...x.c$/, $file) and (!grep /stm32...x_conf\.h$/, $file))
    {
       # Statistic components
       my $update = MSG_NOCHANGE;
       my $warning = 0;
       my $error = 0;

       my @out_all_lines;
       my @in_all_lines;
       # Read all lines from the file
       getAlllinesfromfile($file, \@in_all_lines);
       
       # Print file name in console
       printFilename($in_dir, $file);

       my ($attempt, $try_again);
       for (my $count = 0; $count < @in_all_lines; $count++)
       {
         # it's a comment ? if so, print it without any process (supporting multi-line comments)
         if (printComments(\$count, \@in_all_lines, \@out_all_lines) eq PASS) { next; }

         # it's an include C syntax ? so, need to upgrade it to LL one
         if (printInclude($targetSRC, $targetDST, \$count, \@in_all_lines, \@out_all_lines, \$error) eq PASS) { $update = MSG_DONE; next; }

         # it's a function C syntax ? so, perform the transformation process
         # We use database commands to migrate them to LL API
         # Multiple attempts may needed in order to migrate multiple functions may exist in one code line
         $attempt = FIRST_ATTEMPT;
         $try_again = AUTORIZED;
         reprocess_function:
         if (printFunction($targetSRC, $targetDST, \@database_spl_functions, \$count, \@in_all_lines, \@out_all_lines, $attempt, \$try_again, \$error, \$warning, \$var_counter) eq PASS)
         {
           $in_all_lines[$count] = $out_all_lines[@out_all_lines - 1];
           $attempt++;
           $update = MSG_DONE;

           # Avoid to enter in infinite loop when we have the same SPL/LL expression naming
           # If not try again (for lines where contains more than one function)
           if ($try_again eq AUTORIZED) { goto reprocess_function; }
         }

         # Exist an SPL literals, need to map all exist literals in database and upgrade them to LL one
         if (printLiterals($targetDST, \@database_spl_literals, \$count, \@in_all_lines, \@out_all_lines, $attempt, \$error, \$warning) eq PASS) { $update = MSG_DONE; next; }

         # No success upgrade done, need to print the current line as it's
         if (($attempt == FIRST_ATTEMPT) && ($try_again eq AUTORIZED))
         {
            # Line code not processed by the tool
            push (@out_all_lines, $in_all_lines[$count]);
         }
       }

       # After finishing updates, we store the file
       printAlllinestofile($in_dir, $file, $out_dir, \@out_all_lines);

       # Print file status
       printFileprocess($update, \$error, \$warning);

       # Update statistic components
       $all_errors+= $error;
       $all_warnings+= $warning;
       if ($update eq MSG_NOCHANGE) { $nochange_files++; }
    }
    else
    {
      if (grep /stm32...x_conf\.h$/, $file)
      {
        # Copy HAL conf file
        copyCubefiles($targetDST, $hal_conf_path, $file, $in_dir, $out_dir);
      }

      # Informing user that he should use the system file available under CMSIS device and stm32xxxx_hal_conf.h will not copied
      printFileWarning($in_dir, $file, $targetDST);
    }
}

# print migration status
printUpgradestatus(scalar @src_files, $nochange_files, $all_errors, $all_warnings, $time_start);

# Print log file
printLogfile($out_dir, \@log_all_lines);

exit;

###########################################################################################################
#                                              C Parser API
###########################################################################################################

# @brief Search literal, push its equivalence to pipe and report info to user
# @retval out_all_lines, error
sub printLiterals
{
  my ($targetDST, $database_spl_literals, $count, $in_all_lines, $out_all_lines, $attempt, $error, $warning) = @_;

  my $status = FAIL;
  my $line;
  my $delete = FALSE;

  # New line to be processed
  if ($attempt == FIRST_ATTEMPT)
  {
    $line = $$in_all_lines[$$count];
  }
  # Update current line (it should be updated before in function process)
  else
  {
   $line = $$out_all_lines[@$out_all_lines - 1];
  }

  # Parse all spl literals database
  foreach (@$database_spl_literals)
  {
    # Avoid updating items in array
    my $db_spl_literal_struct = $_;

    # Check if this feature is available for target or report it to log
    if (!grep (/^\[N\/A\]/, $db_spl_literal_struct))
    {
       # Need to know if the value is a structure field or literal
       if (grep (/^\[F_STRUCT\]/, $db_spl_literal_struct))
       {
         # Remove [F_STRUCT] motif
         $db_spl_literal_struct =~ s/^\[F_STRUCT\]//;

         # Avoid any recursively update
         if ((grep (/\s*\.\s*$db_spl_literal_struct\W/, $line)) or (grep (/\s*\-\>\s*$db_spl_literal_struct\W/, $line)))
         {
            # Search structure equivalance from database
            my @db_ll_structure;
            my @structure_format = (STRUCTURE, $targetDST, $db_spl_literal_struct);
            databaseQuery(\@structure_format, \@db_ll_structure);

            # Remove line if this 
            if ($db_ll_structure[0] eq "[DELETE]") { $delete = TRUE; }

            # Check motif
            if (grep (/\s*\.\s*$db_spl_literal_struct\W/, $line))
            {
              # Replace all exist patterns
              $line =~ s/\s*\.\s*$db_spl_literal_struct/\.$db_ll_structure[0]/g;
            }
            else
            {
              # Replace all exist patterns
              $line =~ s/\s*\-\>\s*$db_spl_literal_struct/\-\>$db_ll_structure[0]/g;
            }
            
            # Report a warning to user
            if ($db_ll_structure[1] ne "")
            {
              printWarn($$count, $db_spl_literal_struct, $db_ll_structure[1], \$$warning);
            }
      
            $status = PASS;
         }
       }
       # We are in simple literal
       else
       {
         # Avoid any recursively update
         repeat_again_transformation:
         if (grep (/\W+$db_spl_literal_struct\W/, $line))
         {
            # Find FULL expression position (w/ metacharacter)
            $line =~ /(\W+$db_spl_literal_struct\W)/;
            my $current_literal =  substr $line, $-[0], $+[0] - $-[0];

            # Search literal equivalance from database
            my @db_ll_literal;
            my @literal_format = (LITERAL, $targetDST, $db_spl_literal_struct);
            databaseQuery(\@literal_format, \@db_ll_literal);

            # Update only concerned literal
            my $updated_literal = $current_literal;
            $updated_literal =~ s/$db_spl_literal_struct/$db_ll_literal[0]/;

            # Insert backslash before metacharacters
            $current_literal = quotemeta($current_literal);

            # Update line
            $line =~ s/$current_literal/$updated_literal/;
            
            # Report a warning to user
            if ($db_ll_literal[1] ne "")
            {
              printWarn($$count, $db_spl_literal_struct, $db_ll_literal[1], \$$warning);
            }

            $status = PASS;
            goto repeat_again_transformation;
         }
         elsif (grep (/^$db_spl_literal_struct\W/, $line))
         {
            # Search literal equivalance from database
            my @db_ll_literal;
            my @literal_format = (LITERAL, $targetDST, $db_spl_literal_struct);
            databaseQuery(\@literal_format, \@db_ll_literal);

            # Update line
            $line =~ s/^$db_spl_literal_struct/$db_ll_literal[0]/;

            # Report a warning to user
            if ($db_ll_literal[1] ne "")
            {
              printWarn($$count, $db_spl_literal_struct, $db_ll_literal[1], \$$warning);
            }

            $status = PASS;
            goto repeat_again_transformation;
         }
       }
    }
    # Report the feature to user (Log file)
    else
    {
      # Remove [N/A] motif
      $db_spl_literal_struct =~ s/^\[N\/A\]//;

      # Need to know if the value is a structure field or literal
      if (grep (/^\[F_STRUCT\]/, $db_spl_literal_struct))
      {
        # Remove [F_STRUCT] motif
        $db_spl_literal_struct=~ s/^\[F_STRUCT\]//;

        # Search pattern and report to user
        if ((grep (/\s*\.\s*$db_spl_literal_struct\W/, $line)) or (grep (/\s*\-\>\s*$db_spl_literal_struct\W/, $line)))
        {
          # Report an error to user
          printError($$count, $db_spl_literal_struct, MSG_ERROR_STRUCT, \$$error);
        }
      }
      # We are in simple literal
      else
      {
        # Search pattern and report to user
        if (grep (/\W?$db_spl_literal_struct\W/, $line))
        {
          # Report an error to user
          printError($$count, $db_spl_literal_struct, MSG_ERROR_LITERAL, \$$error);
        }
      }
    }
  }

  if (($status eq PASS) && ($delete == FALSE))
  {
    if ($attempt > FIRST_ATTEMPT)
    {
       # Remove the last line in order to reupdate it
       pop @$out_all_lines;
    }

    # Add the updated line to ouput array
    push (@$out_all_lines, $line);
  }

  return $status;
}

# @brief Search function, push its equivalence to pipe and report info to user
# @retval out_all_lines, error, warning
sub printFunction
{
  my ($targetSRC, $targetDST, $database_spl_functions, $count, $in_all_lines, $out_all_lines, $attempt, $try_again, $error, $warning, $var_counter) = @_;

  my $status = FAIL;
  my $line = $$in_all_lines[$$count];
  my $migration_type = ($targetSRC eq $targetDST) ? IN_SERIE : CROSS_SERIE;

  # Search function using spl name tag and return its position
  my ($start_offset, $end_offset);
  if (searchFunction(\@$database_spl_functions, scalar $$count, $line, \$start_offset, \$end_offset, \$$error) eq PASS)
  {
    # Extract all arguments from the function
    my ($fullparsedfunction, $func_name);
    my @func_params;
    my $multiline_count = 0;
    getFunctionwithARGS(\$line, \@$in_all_lines, \$$count, $start_offset, $end_offset, \$fullparsedfunction, \$func_name, \@func_params, \$multiline_count);

    # Create a function vector (to be processed in module 3)
    my @function_format = (FUCNTION, $targetSRC, $targetDST, $func_name);
    foreach (@func_params) { push (@function_format, $_ ); }

    # Find function equivalance in database
    my @ll_xml_equiv;
    my $equiv_status = databaseQuery(\@function_format, \@ll_xml_equiv);
    if ($equiv_status eq PASS)
    {
      # Equivalence exist !
      # Start upgrading (execute LL commands)
      my @ll_equiv_str;
      my $warning_msg = undef;
      upgradeFunction(\@function_format, \@ll_xml_equiv, \@ll_equiv_str, \$warning_msg, \$$var_counter);

      # It's not allowed to reupgrade code line which expressions have the same naming
      if ($func_name eq ${$ll_xml_equiv[0]}[0]) { $$try_again = NOT_AUTORIZED; }

      # Print migrated functions (it may be more than one function)
      my $count_item = 0;
      foreach (@ll_equiv_str)
      {
        if ($count_item < @ll_equiv_str - 1)
        {
          my $begin_space = $line;
          $begin_space =~ /(^\s*)/;
          $begin_space = substr $begin_space, 0, $+[0];
          if ($attempt > FIRST_ATTEMPT)
          {
            # Remove the last line in order to reupdate it
            pop @$out_all_lines;
          }

          # Don't add ; for non-LL code
          if (grep (/\[NON\-LL\]$/, $_)) { $_ =~ s/\[NON\-LL\]$//; push (@$out_all_lines, $begin_space . $_ . "\n"); }
          else { push (@$out_all_lines, $begin_space . $_ . ";\n"); }

          $count_item++;
        }
        else
        {
          # Insert backslash before metacharacters
          $fullparsedfunction = quotemeta($fullparsedfunction);

          # Don't add ; for non-LL code
          if (grep (/\[NON\-LL\]$/, $_)) { $_ =~ s/\[NON\-LL\]$//; }

          # Replace the spl function with ll one
          $line =~ s/$fullparsedfunction/$_/g;

          if ($attempt > FIRST_ATTEMPT)
          {
            # Remove the last line in order to reupdate it
            pop @$out_all_lines;
          }

          # Add the updated line
          push (@$out_all_lines, $line);
        }
      }

      if ($warning_msg ne "")
      {
         # Report a warning to user
         printWarn(($$count - $multiline_count), $func_name, $warning_msg, \$$warning);
      }

      $status = PASS;
    }
    elsif ($equiv_status eq ERROR)
    {
      # Report an error to user
      if ($migration_type eq CROSS_SERIE) { printError(($$count - $multiline_count), $func_name, MSG_ERROR_FUNC, \$$error); }

      # Reset line counter
      $$count -= $multiline_count;
    }
    else
    {
      # Reset line counter
      $$count -= $multiline_count;
    }
  }

  return $status;
}

# @brief Search function from a line
# @retval start_offset, end_offset, error
sub searchFunction
{
  my ($database_spl_functions,  $count, $line, $start_offset, $end_offset, $error) = @_;

  foreach (@$database_spl_functions)
  {
     my $feature = $_;

     # Find expression where must not start with LL_ and must have () function syntax
     if ($line =~ /(\W{1}$feature\s*\()/) 
     {
        # Return expression offsets
        $$start_offset = $-[0] + 1;
        $$end_offset = $+[0];
        return PASS;
     }
     elsif ($line =~ /(^$feature\s*\()/)
     {
        # Return expression offsets
        $$start_offset = $-[0];
        $$end_offset = $+[0];
        return PASS;
     }
  }
  return FAIL;
}

# @brief Extract arguments from function
# @retval fullparsedfunction, func_name, func_params
sub getFunctionwithARGS
{
  my ($current_line, $in_all_lines, $count, $start_offset, $end_offset, $fullparsedfunction, $func_name, $func_params, $multiline_count) = @_;

  my $line = $$in_all_lines[$$count];

  # We suppose we have a complete expression in one line (no multi-line code)
  # Extract only function name
  $$func_name = substr $line, $start_offset, $end_offset - $start_offset - 1;

  # Remove any extra spaces exist in name
  $$func_name =~ s/^\s+|\s+$//g;

  my @open_offset;
  my @close_offset;

  # Get ARGS sequence
  my $args = substr $line, $end_offset - 1, length($line);
  my $exp_tmp = $args;

  my $is_multiline = SINGLE_LINE;
  my $multiline_exp;
  my $start_line_count = $$count;
  my $close_offset_multiline = 0;

process_again:
  # Search () patterns occurences in order to determine ARGS
  while ($exp_tmp =~ /(\(|\))/g)
  {
     if (substr ($args, $-[0], 1) eq '(')
     {
       push (@open_offset, $-[0]);
     }
     else
     {
       push (@close_offset, $-[0]);
     }

     # Break out when ( ) patterns are equal
     if (@open_offset == @close_offset) { last; }
  }

  # Not a complete expression, so we are in multi-line code
  if (@open_offset != @close_offset)
  {
    $multiline_exp .= $exp_tmp;

    # Jump to next line
    $$multiline_count++;
    $$count++;
    $exp_tmp =  $$in_all_lines[$$count];
    $args = $exp_tmp;

    # Update multiline status
    $is_multiline = MULTI_LINE_FIRST_STEP;

    # Process the new line
    goto process_again;
  }

  # We have finally found the complete expression
  if ($is_multiline == MULTI_LINE_FIRST_STEP)
  {
    # Get the offset on last ')' pattern in last line, to be used when replace the SPL functipn by LL one
    $close_offset_multiline =  $close_offset[@close_offset - 1];

    # Let's make the expression in one line (remove '\n' and '\' patterns)
    $multiline_exp .= $exp_tmp;
    $multiline_exp =~ s/[\n]|\\//g;

    # Update multiline status
    $is_multiline = MULTI_LINE_SECOND_STEP;

    # Process it as a complete expression in one line
    $exp_tmp = $multiline_exp;
    $args = $multiline_exp;
    goto process_again;
  }

  # Get only parameters sequence
  $exp_tmp = substr $args, 1, ($close_offset[@close_offset - 1] - 1);

  # Extract parameters using split and ',' pattern
  @$func_params = split (',', $exp_tmp);

  # Remove any extra spaces exist in arguments
  foreach (@$func_params) { $_=~ s/^\s+|\s+$//g };

  # Is a multi-line code ?
  if ($is_multiline == MULTI_LINE_SECOND_STEP)
  {
     # Get the first and last lines
     my $start_line = $$in_all_lines[$start_line_count];
     my $end_line = $$in_all_lines[$$count];

     # Extract user code between SPL function
     my $tmp_start = substr $start_line, 0, $start_offset;
     my $tmp_end = substr $end_line, $close_offset_multiline + 1, (length ($end_line) - $close_offset_multiline - 1);

     # Update spl function code lines by [###] pattern, this pattern to be updated by LL code
     $$current_line = $tmp_start . "[###]" . $tmp_end;
     $$fullparsedfunction = "[###]";
  }
  else
  {
    # Create FULL parsed function to be replaced with LL one
    $$fullparsedfunction =  substr $line, $start_offset, $end_offset - $start_offset + $close_offset[@close_offset - 1];
  }
}

# @brief Search include, push its equivalence to pipe and report info to user
# @retval out_all_lines, error
sub printInclude
{
  my ($targetSRC, $targetDST, $count, $in_all_lines, $out_all_lines, $error) = @_;

  my $status = FAIL;

  # Check if this line is started by #include "stm32{family}x spl include suffix or just misc.h
  my $str_tmp = lc ($targetSRC);
  
  # Remove sub family reference 
  if (length ($str_tmp) > 7) { chop ($str_tmp); }
  if ((grep (/^\s*\#include\s*\"$str_tmp.x/, $$in_all_lines[$$count])) or (grep (/^\s*\#include\s*\"misc\.h\"/, $$in_all_lines[$$count])))
  {
     # Extract spl include from the line
     my $spl_inc = (split ('\"', $$in_all_lines[$$count]))[1];

     # Create include vector to be used in database query
     my @include_format = (INCLUDE, $targetSRC, $targetDST, $spl_inc);

     # Search include equivalance from database
     my @ll_inc;
     my $equiv_status = databaseQuery(\@include_format, \@ll_inc);
     if ($equiv_status eq PASS)
     {
       # Add updated line
       foreach (@ll_inc)
       {
         push (@$out_all_lines, '#include "' . $_ . '"' . "\n");
       }
       $status = PASS;
     }
     elsif ($equiv_status eq ERROR)
     {
       # Report an error to user
       printError($$count, $spl_inc, "include", \$$error);
     }
  }

 return $status;
}

# @brief Search comments and push them to pipe
# @retval out_all_lines
sub printComments
{
  my ($count, $in_all_lines, $out_all_lines) = @_;

  my $status = FAIL;

  # Check if this line is started by // C syntax comment
  if (grep (/^\s*\/\//, $$in_all_lines[$$count]))
  {
    push (@$out_all_lines, $$in_all_lines[$$count]);
    $status = PASS;
  }
  # Check if this line is started by /* C syntax comment
  elsif (grep (m(^\s*/\*), $$in_all_lines[$$count]))
  {
    # Case when we have only one line comment "*\"
    if (grep (m(\*\/\s*$), $$in_all_lines[$$count]))
    {
      push (@$out_all_lines, $$in_all_lines[$$count]);
      $status = PASS;
    }
    # We are in multilple line comments "*\"
    else
    {
      while (grep (m(\*\/\s*$), $$in_all_lines[$$count]) == 0)
      {
        push (@$out_all_lines, $$in_all_lines[$$count]);
        $$count++;
      }
      push (@$out_all_lines, $$in_all_lines[$$count]);
      $status = PASS;
    }
  }

 return $status;
}

###########################################################################################################
#                                         Command Interpreter API
###########################################################################################################

# @brief Upgrade SPL function LL one using database definition (expression and commands)
# @retval ll_xml_equiv and ll_equiv_str
sub upgradeFunction
{
  my ($spl_function, $ll_xml_equiv, $ll_equiv_str, $warning_msg, $var_counter) = @_;

  foreach my $ll_function (@$ll_xml_equiv)
  {
      my $ll_tmp;
      # Get LL function name
      my $ll_name = $$ll_function[0];
      # Get only LL commands
      my @ll_cmds = @{$ll_function}[1..(@$ll_function - 2)];
      # Get Log message
      $$warning_msg = $$ll_function[@$ll_function - 1];

      my @ll_param;
      foreach my $cmd (@ll_cmds)
      {
        # Execute each command and store the new param value in @ll_param
        executeLLcommand($ll_name, $cmd, \@$spl_function, \@ll_param, \$$var_counter);
      }

      # Verify if the LL equivalence is available or it's a NON-LL code
      if ($ll_name ne XML_NA)
      {
        # Create FULL LL function
        foreach (@ll_param) { $ll_tmp .= $_ . ", "; }
        # Need to remove the last ", "
        $ll_tmp = $ll_name . "(" . substr ($ll_tmp, 0, (length ($ll_tmp) - 2)) . ")";
        push (@$ll_equiv_str, $ll_tmp);
      }
      # NON-LL code
      else
      {
        foreach (@ll_param) { push (@$ll_equiv_str, $_ . '[NON-LL]'); }
        $$var_counter++;
      }
  }
}

# @brief Playing on parameters commands
# @retval ll_param (updated param)
sub executeLLcommand
{
  my ($ll_function, $cmd, $spl_function, $ll_param, $var_counter) = @_;

  # Verify if the LL equivalence is available or it's a NON-LL code
  if ($ll_function ne XML_NA)
  {
     # Extract operation, parameter and the literal/spl_command from the LL cmd
     my ($op_full, $ll_literal_cmd) = split (XML_OP_1, $cmd);
     my ($op, $param) = split (XML_OP_0, $op_full);

     # Verify if the xml command is correct
     if (($op ne XML_OP_DEL) and ($ll_literal_cmd eq '')) { printErrorAndExit("$ll_function : Please check XML LL command (function section)", MSG_FAIL); }
     else
     {
        # Check if the operation to be performed is UPDATE or ADD
        if (($op eq XML_OP_UPD) or ($op eq XML_OP_ADD))
        {
           # Check if it's a simple literal or a command
           if (parseCommand($ll_literal_cmd, $ll_function) eq XML_CMD)
           {
              my $new_param;
              getnewLLparam($ll_literal_cmd, $ll_function, \@$spl_function, \$new_param);
              push (@{$ll_param}, $new_param);
           }
           else
           {
             push (@{$ll_param}, $ll_literal_cmd);
           }
        }
        # Check if the operation to be performed is DELETE
        elsif ($op eq XML_OP_DEL) {}
        else { printErrorAndExit("$ll_function : Please check XML LL command (function section)", MSG_FAIL); }
     }
  }
  # NON-LL code
  else
  {
    # Update variables naming in order to avoid redeclaration when the same code is called several times
    # Variable should have this suffix tmp_ppp_n_$id$
    $cmd =~ s/\$id\$/$$var_counter/g;

    my @spl_params = @$spl_function[4..(@$spl_function - 1)];
    my $targetDST = ${$spl_function}[2];

    my $count = 0;
    foreach (@spl_params)
    {
      # COPY command processing
      my $cmd_format = '{CPY@SPL_PARAM_' . $count . '}';
      # Remove & metacharacter
      $_ =~ s/^&//;
      # Update all exist COPY commands by their values
      $cmd =~ s/$cmd_format/$_/g;

      # UPDATE command processing
      $cmd_format = '{UPD@SPL_PARAM_' . $count . '}';

      # Search literal equivalance from database
      my @db_ll_literal;
      my @literal_format = (LITERAL, $targetDST, $_);
      databaseQuery(\@literal_format, \@db_ll_literal);
      $_ = $db_ll_literal[0];

      # Update all exist UPDATE commands by their values
      $cmd =~ s/$cmd_format/$_/g;

      $count++;
    }

    my @nonLL_code = split (/\\n/, $cmd);
    foreach (@nonLL_code)
    {
      # Trim string (remove left and right extra spaces)
      $_ =~ s/^\s+|\s+$//g;
      push (@{$ll_param}, $_);
    }
  }
}

# @brief Execute command on param
# @retval new_param (updated param)
sub getnewLLparam
{
   my ($ll_literal_cmd, $ll_function, $spl_function, $new_param) = @_;

   my @spl_params = @$spl_function[4..(@$spl_function - 1)];
   my $targetDST = ${$spl_function}[2];
   my $cmd = substr ($ll_literal_cmd, 1, (length ($ll_literal_cmd) - 2));
   my ($op, $param) = split (XML_OP_0, $cmd);

   # Get parameter position
   my $spl_param_pos = getparamPos($ll_function, $param);

   # Check if the operation to be performed is UPDATE
   if ($op eq XML_OP_UPD)
   {
      # Search literal equivalance from database
      my @db_ll_literal;
      my @literal_format = (LITERAL, $targetDST, $spl_params[$spl_param_pos]);
      my $equiv_literal_status = databaseQuery(\@literal_format, \@db_ll_literal);
      if ($equiv_literal_status eq PASS) { $$new_param = $db_ll_literal[0]; } else { $$new_param = $spl_params[$spl_param_pos]; } 
   }
   elsif ($op eq XML_OP_CPY) { $$new_param = $spl_params[$spl_param_pos]; }
   else { printErrorAndExit("$ll_function : Please check XML LL command (function section)", MSG_FAIL); }
}

# @brief Check if the expression is a command or a simple literal
# @retval new_param (updated param)
sub parseCommand
{
   my ($ll_literal_cmd, $ll_function) = @_;

   # Check if it's a command
   if (index ($ll_literal_cmd, '{') == 0)
   {
     if (index ($ll_literal_cmd, '}') == (length ($ll_literal_cmd) - 1))
     {
        return XML_CMD;
     }
     else { printErrorAndExit("$ll_function : Please check XML LL command (function section)", MSG_FAIL); }
   }
   # else it's a simple LL literal
   else
   {
     return XML_LITERAL;
   }
}

###########################################################################################################
#                                          Database query API
###########################################################################################################

# @brief  Parse database in order to find the SPL LL equivalence and their commands
# @retval the check status and the LL correspondence
sub databaseQuery
{
  my ($item, $ll_equiv) = @_;

  my $equiv_status = FAIL;

  # Get items C type
  if (@$item[0] == INCLUDE)
  {
     $equiv_status = findEquivalanceinclude(\@$item, \@$ll_equiv);
  }
  elsif (@$item[0] == FUCNTION)
  {
    $equiv_status = findEquivalancefunction(\@$item, \@$ll_equiv);
  }
  elsif (@$item[0] == LITERAL)
  {
    $equiv_status = findEquivalanceliteral(\@$item, \@$ll_equiv);
  }
  elsif (@$item[0] == STRUCTURE)
  {
    $equiv_status = findEquivalancestructure(\@$item, \@$ll_equiv);
  }

  return $equiv_status;
}

###########################################################################################################
#                                      INCLUDE mode subroutines
###########################################################################################################

# @brief  Search SPL LL include equivalence
#         (read xml databases and find SPL include tag)
# @retval LL include (string) and the check status
sub findEquivalanceinclude
{
  my ($spl_include, $ll_equiv) = @_;

  my $equiv_status = FAIL;

  # Get STM32 family and SPL include
  my ($current_family, $target_family, $include) = @{$spl_include}[1..3];

  if (grep (/\_/, $include)) { $include = (split ('_', $include))[1]; }
  $equiv_status = xmlParseincludetag($current_family, $target_family, $include, \@$ll_equiv);

  return ($equiv_status);
}

# @brief Parse xml database in order to find the equivalence (include mode)
# @retval Status
sub xmlParseincludetag
{
  my ($current_family, $target_family, $include, $ll_equiv) = @_;

  my $equiv_status = FAIL;

  # Set filter to search only includes
  my $handlers = {'INCLUDE/COMMON'                       => sub { xmlincludeHandler( @_, $current_family, $target_family, '', $include, \@$ll_equiv, \$equiv_status); },
                  'INCLUDE/SPECIFIC/' . $current_family  => sub { xmlincludeHandler( @_, $current_family, $target_family, '[N/A]', $include, \@$ll_equiv, \$equiv_status); },
                  'INCLUDE/SPECIFIC/' . $target_family   => sub { xmlincludeHandler( @_, $current_family, $target_family, '', $include, \@$ll_equiv, \$equiv_status); }
                 };
  my $twig = new XML::Twig(TwigHandlers => $handlers);

  if(!safe_parsefile($twig, $include_database_path))
  {
    printErrorAndExit("Failed to parse $include_database_path.\n$@\n", MSG_EMPTY);
  }

  return $equiv_status;
}

# @brief Handler of xmlParseincludetag()
# @retval None
sub xmlincludeHandler 
{
  my ($twig, $ele, $current_family, $target_family, $report, $include, $ll_equiv, $equiv_status) = @_;

  # Dumps all features
  foreach my $feature ($ele->children)
  {
     # Get SPL include
     foreach my $spl_item ($feature->children(XML_SPL()))
     {
        my $item_include = $spl_item->text;

        if (grep (/\_/, $item_include)) { $item_include = (split ('_', $item_include))[1]; }
        my $family_tmp = lc $current_family;
        $item_include =~ s/^stm32\{family\}/$family_tmp/;

        if ($include eq $item_include)
        {
           # it's available for this target ?
           if ($report ne '[N/A]')
           {
              # Remove sub family reference 
              $target_family = removeSubfamily($target_family);
                              
              # Get all LL items from database
              foreach my $ll_item ($feature->children(XML_LL()))
              {
                # Update family tag with target device
                my $ll_inc_tmp = $ll_item->text;
                $ll_inc_tmp =~ s/stm32\{family\}/$target_family/;
                
                # Create the new line and push it
                push (@$ll_equiv, $ll_inc_tmp);
              }

              ${$equiv_status} = PASS;
              goto PASS_CHECK;
           }
           else
           {
             if (${$equiv_status} ne PASS) { ${$equiv_status} = ERROR; }
           }
        }
     }
  }

PASS_CHECK:
  $twig->purge;
}

###########################################################################################################
#                                      LITERAL mode subroutines
###########################################################################################################

# @brief  Search SPL LL literal equivalence
#         (read xml databases and find SPL literal tag)
# @retval LL literal (string) and the check status
sub findEquivalanceliteral
{
  my ($spl_literal, $ll_equiv) = @_;

  my $equiv_status = FAIL;

  # Get STM32 family and SPL literal
  my ($targetDST, $literal) = @{$spl_literal}[1,2];

  $equiv_status = xmlParseliteraltag($targetDST, $literal, \@$ll_equiv);

  return $equiv_status;
}

# @brief Parse xml database in order to find the equivalence (literal mode)
# @retval Status
sub xmlParseliteraltag
{
  my ($targetDST, $literal, $ll_equiv) = @_;
  my $equiv_status = FAIL;
  my $file;

  # Try to point directly on the correct XML database
  if (getXMLname($literal, \$file))         { __xmlParseliteraltag($file, $targetDST, $literal, \@$ll_equiv, \$equiv_status); }
  else { foreach my $file (@database_files) { __xmlParseliteraltag($file, $targetDST, $literal, \@$ll_equiv, \$equiv_status); } }

  return $equiv_status;
}

# @brief Parse xml database
# @retval Status
sub __xmlParseliteraltag
{
  my ($file, $targetDST, $literal, $ll_equiv, $equiv_status) = @_;

  # Create full file path
  my $file_path = $database_path . $file;

  # Get IP name from xml file name
  # PPP should be in uppercase
  my $ppp = uc ((split ('\.', $file))[0]);

  # Get IP version from xml database
  my $ppp_version = getPPPversion($targetDST, $ppp);

  # Set filter to search only literals
  my $handlers = { "//COMMON/LITERALS"                                           => sub { xmlliteralHandler( @_, $file, $targetDST, $literal, \@$ll_equiv, \$$equiv_status); },
                   "//SPECIFIC/VERSION[\@NAME='" . $ppp_version . "']/LITERALS"  => sub { xmlliteralHandler( @_, $file, $targetDST, $literal, \@$ll_equiv, \$$equiv_status); }
                 };
  my $twig = new XML::Twig(TwigHandlers => $handlers);

  if(!safe_parsefile($twig, $file_path))
  {
    printErrorAndExit("Failed to parse $file_path.\n$@\n", MSG_EMPTY);
  }
}

# @brief Handler of xmlParseliteraltag()
# @retval None
sub xmlliteralHandler
{
  my ($twig, $ele, $file, $targetDST, $literal, $ll_equiv, $equiv_status) = @_;

  # Dumps all features
  foreach my $feature ($ele->children)
  {
     # Check if this feature is excluded from the target
     my $exclude_status = FALSE;
     getFeaturestatus(\$feature, $targetDST, \$exclude_status);
     if ($exclude_status == FALSE)
     {
       # Get SPL literal
       foreach my $spl_item ($feature->children(XML_SPL()))
       {
          my $item_literal = $spl_item->text;
          if ($literal eq $item_literal)
          {
             # Store the LL literal          
             push (@$ll_equiv, $feature->first_child(XML_LL())->text);

             # Report a warning to user
             push (@$ll_equiv, $feature->first_child(XML_LL())->att(XML_LOG()));

             ${$equiv_status} = PASS;
             goto PASS_CHECK;
          }
       }
     }
  }

PASS_CHECK:
  $twig->purge;
}

###########################################################################################################
#                                      STRUCTURE mode subroutines
###########################################################################################################

# @brief  Search SPL LL structure equivalence
#         (read xml databases and find SPL structure tag)
# @retval LL structure (array) and the check status
sub findEquivalancestructure
{
  my ($spl_structure, $ll_equiv) = @_;

  my $equiv_status = FAIL;

  # Get STM32 family and SPL structure
  my ($targetDST, $structure) = @{$spl_structure}[1,2];

  $equiv_status = xmlParsestructuretag($targetDST, \$structure, \@$ll_equiv);

  return $equiv_status;
}

# @brief Parse xml database in order to find the equivalence (structure mode)
# @retval Status
sub xmlParsestructuretag
{
  my ($targetDST, $structure, $ll_stucture_equiv) = @_;
  my $equiv_status = FAIL;
  my $file;

  # Try to point directly on the correct XML database
  if (getXMLname($structure, \$file))       { __xmlParsestructuretag($file, $targetDST, \$$structure, \@$ll_stucture_equiv, \$equiv_status); }
  else { foreach my $file (@database_files) { __xmlParsestructuretag($file, $targetDST, \$$structure, \@$ll_stucture_equiv, \$equiv_status); } }

  return $equiv_status;
}

# @brief Parse xml database
# @retval Status
sub __xmlParsestructuretag
{
  my ($file, $targetDST, $structure, $ll_stucture_equiv, $equiv_status) = @_;
  
  # Create full file path 
  my $file_path = $database_path . $file;

  # Get IP name from xml file name
  # PPP should be in uppercase
  my $ppp = uc ((split ('\.', $file))[0]);

  # Get IP version from xml database
  my $ppp_version = getPPPversion($targetDST, $ppp);

  # Set filter to search only structures
  my $handlers = { "//COMMON/STRUCTURES"                                           => sub { xmlstructureHandler( @_, $file, \$$structure, \@$ll_stucture_equiv, \$$equiv_status); },
                   "//SPECIFIC/VERSION[\@NAME='" . $ppp_version . "']/STRUCTURES"  => sub { xmlstructureHandler( @_, $file, \$$structure, \@$ll_stucture_equiv, \$$equiv_status); }
                 };
  my $twig = new XML::Twig(TwigHandlers => $handlers);

  if(!safe_parsefile($twig, $file_path))
  {
    printErrorAndExit("Failed to parse $file_path.\n$@\n", MSG_EMPTY);
  }
}

# @brief Handler of xmlParsestructuretag()
# @retval None
sub xmlstructureHandler
{
  my ($twig, $ele, $file, $structure, $ll_stucture_equiv, $equiv_status) = @_;

  # Dumps all features
  foreach my $feature ($ele->children)
  {
    # Dumps all fields available
    foreach my $field ($feature->children)
    {
       # Get SPL structure
       foreach my $spl_item ($field->children(XML_SPL()))
       {
          my $item_structure = $spl_item->text;
          if ($$structure eq $item_structure)
          {
             # Store the LL field
             push (@$ll_stucture_equiv, $field->first_child(XML_LL())->text);

             # Report a warning to user
             push (@$ll_stucture_equiv, $field->first_child(XML_LL())->att(XML_LOG()));

             ${$equiv_status} = PASS;
             goto PASS_CHECK;
          }
       }
    }
  }

PASS_CHECK:
  $twig->purge;
}

###########################################################################################################
#                                      FUNCTION mode subroutines
###########################################################################################################

# @brief  Search SPL LL function equivalence
#         (read xml databases and find SPL function tag)
# @retval LL function, LL commands (array) and the check status
sub findEquivalancefunction
{
  my ($spl_function, $ll_equiv) = @_;

  my $equiv_status = FAIL;

  # Get STM32 targets and SPL function name
  my ($targetSRC, $targetDST, $spl_func_name) = @{$spl_function}[1..3];

  # Extract SPL parameters
  my @spl_params = @{$spl_function}[4..(@$spl_function - 1)];

  # convert hex/bin numbers to decimal (because in the database, all arguments number are defined in decimal value)
  foreach (@spl_params) { if (grep /^0x/, $_) { $_ = hex($_); } elsif(grep /^0b/, $_) { $_ = oct($_); } }

  # Check the migration type
  my $migration_type = ($targetSRC eq $targetDST) ? IN_SERIE : CROSS_SERIE;

  $equiv_status = xmlParsefunctiontag($targetSRC, $targetDST, $migration_type, $spl_func_name, \@spl_params, \@$ll_equiv);

  return $equiv_status;
}

# @brief Parse xml database in order to find the equivalence (function mode)
# @retval Status
sub xmlParsefunctiontag
{
  my ($targetSRC, $targetDST, $migration_type, $spl_func_name, $spl_params, $ll_equiv) = @_;
  my $equiv_status = FAIL;
  my $file;

  # Try to point directly on the correct XML database
  if (getXMLname($spl_func_name, \$file))   { __xmlParsefunctiontag($file, $targetSRC, $targetDST, $migration_type, $spl_func_name, \@$spl_params, \@$ll_equiv, \$equiv_status); }
  else { foreach my $file (@database_files) { __xmlParsefunctiontag($file, $targetSRC, $targetDST, $migration_type, $spl_func_name, \@$spl_params, \@$ll_equiv, \$equiv_status); } }

  return $equiv_status;
}

# @brief Parse xml database
# @retval Status
sub __xmlParsefunctiontag
{
  my ($file, $targetSRC, $targetDST, $migration_type, $spl_func_name, $spl_params, $ll_equiv, $equiv_status) = @_;

  # Create full file path 
  my $file_path = $database_path . $file;

  # Get IP name from xml file name
  # PPP should be in uppercase
  my $ppp = uc ((split ('\.', $file))[0]);

  # Get IP versions from xml database
  my $src_ppp_version = getPPPversion($targetSRC, $ppp);
  my $dst_ppp_version = getPPPversion($targetDST, $ppp);

  # Set filter to search only functions
  my $handlers;
  if ($migration_type eq CROSS_SERIE)
  {
    $handlers = { "//COMMON/FUNCTIONS"                                               => sub { xmlfunctionHandler( @_, $targetDST, $migration_type, '',      $file, $spl_func_name, \@$spl_params, \@$ll_equiv, \$$equiv_status); },
                  "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/FUNCTIONS"  => sub { xmlfunctionHandler( @_, $targetDST, $migration_type, '[N/A]', $file, $spl_func_name, \@$spl_params, \@$ll_equiv, \$$equiv_status); },
                  "//SPECIFIC/VERSION[\@NAME='" . $dst_ppp_version . "']/FUNCTIONS"  => sub { xmlfunctionHandler( @_, $targetDST, $migration_type, '',      $file, $spl_func_name, \@$spl_params, \@$ll_equiv, \$$equiv_status); }
                };
  }
  else
  {
    $handlers = { "//COMMON/FUNCTIONS"                                               => sub { xmlfunctionHandler( @_, $targetDST, $migration_type, '',      $file, $spl_func_name, \@$spl_params, \@$ll_equiv, \$$equiv_status); },
                  "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/FUNCTIONS"  => sub { xmlfunctionHandler( @_, $targetDST, $migration_type, '',      $file, $spl_func_name, \@$spl_params, \@$ll_equiv, \$$equiv_status); }
                };
  }

  my $twig = new XML::Twig(TwigHandlers => $handlers);

  if(!safe_parsefile($twig, $file_path))
  {
    printErrorAndExit("Failed to parse $file_path.\n$@\n", MSG_EMPTY);
  }
}

# @brief Handler of xmlParsefunctiontag()
# @retval None
sub xmlfunctionHandler
{
  my ($twig, $ele, $targetDST, $migration_type, $report, $file, $spl_func_name, $spl_params, $ll_equiv, $equiv_status) = @_;

  # Dumps all features
  foreach my $feature ($ele->children)
  {
     # Check if this feature is excluded from the target
     my $exclude_status = FALSE;
     getFeaturestatus(\$feature, $targetDST, \$exclude_status);

     # Get SPL function name w/ their commands
     foreach my $spl_item ($feature->children(XML_SPL()))
     {
        # Get all attributes available under SPL feature
        my %attributes = %{$spl_item->atts};

        # Extract SPL name from xml
        my $spl_name = $attributes{XML_NAME()};

        # Check firstly by function name then by commands
        if ($spl_func_name eq $spl_name)
        {
           # How many commands exist ?
           my $cmd_length = (keys %attributes) - 1;

           # Need to execute commands
           if ($cmd_length > 0)
           {
              # Put them in array @spl_cmds
              my @spl_cmds = ();
              for (my $i=0; $i<$cmd_length; $i++)
              {
                 push (@spl_cmds, $attributes{XML_CMD . $i});
              }

              # Second step is to execute SPL commands and checks if we are in the right case
              if (executeSPLcommand($file, \@$spl_params, \@spl_cmds) eq PASS)
              {
                 if (($report ne '[N/A]') && ($exclude_status == FALSE))
                 {
                   # Fill ll_equiv array with equivalence found
                   getXmlcmds(\$feature, \@$ll_equiv);
                   ${$equiv_status} = PASS;
                   goto PASS_CHECK;
                 }
                 else
                 {
                   if (${$equiv_status} ne PASS) { ${$equiv_status} = ERROR; }
                 }
              }
           }
           # No SPL commands to be ran
           else
           {
              if (($report ne '[N/A]') && ($exclude_status == FALSE))
              {
                # Fill ll_equiv array with equivalence found
                getXmlcmds(\$feature, \@$ll_equiv);
                ${$equiv_status} = PASS;
                goto PASS_CHECK;
              }
              else
              {
                if (${$equiv_status} ne PASS) { ${$equiv_status} = ERROR; }
              }
           }
        }
     }
  }

PASS_CHECK:
  $twig->purge;
}

# @brief Run the command (SPL side)
# @retval command status (PASS / FAIL)
sub executeSPLcommand
{
  my ($file, $spl_params, $spl_cmds) = @_;

  my $check_status = FAIL;
  my @check_cmds;

  # Get SPL params / commands length
  my $spl_params_length = @$spl_params;
  my $spl_cmds_length = @$spl_cmds;

  # Dumps all commands available
  foreach my $cmd (@$spl_cmds)
  {
    # Extract operation, parameter and spl literal from the command
    my ($op_full, $spl_literal) = split (XML_OP_1, $cmd);
    my ($op, $param) = split (XML_OP_0, $op_full);

    # Verify if the operation is correct
    if ($op eq XML_OP_EQU)
    {
       # Get parameter position
       my $param_pos = getparamPos($file, $param);

       # Support checks on multiple literals under the same parameter
       if (grep (/\#/, $spl_literal))
       {
         # Find all expressions
         my @exp = split /\#/, $spl_literal;

         # Check there avaibilities
         my $exp_status = PASS;
         foreach my $c_exp (@exp) { $c_exp =~ s/^\s+|\s+$//g;if (!grep (/$c_exp/, @$spl_params[$param_pos])) { $exp_status = FAIL; } }
         push (@check_cmds, $exp_status);
       }
       else
       {
         # Param value may has some extra C syntax like casting operation
         if (grep (/$spl_literal$/, @$spl_params[$param_pos])) { push (@check_cmds, PASS); } else { push (@check_cmds, FAIL); }
       }
    }
    else { printErrorAndExit("$file : Please check XML command (function section)", MSG_FAIL); }
  }

  # Verify if all commands are PASS
  $check_status = (grep (/FAIL/, @check_cmds) > 0) ? FAIL : PASS;

  return $check_status;
}

# @brief Get parameters position from operation
# @retval param position
sub getparamPos
{
  my ($file, $param) = @_;
  my $tmp = (split ('_', $param))[2];
  if (looks_like_number($tmp) == 0) { printErrorAndExit("$file : Please check XML command (function section)", MSG_FAIL); }
  return ($tmp);
}

# @brief Get the equivalent LL function
# @retval update ll_equiv array
sub getXmlcmds
{
  my ($feature, $ll_equiv) = @_;

  my @ll_array;

  # Get LL function name w/ their commands
  foreach my $ll_item (${$feature}->children(XML_LL()))
  {
     # Only one LL function will be stored
     my @ll_item_array;

     # Get all attributes available under LL feature
     my %attributes = %{$ll_item->atts};

     # Extract LL name from xml
     my $ll_name = $attributes{XML_NAME()};
     push (@ll_item_array, $ll_name);

     # How many commands exist ?
     my $cmd_length = (keys %attributes) - 1;

     # Log attribut does not computed as command
     $cmd_length-- if exists $attributes{XML_LOG()};

     if ($cmd_length > 0)
     {
        # Put them in array @ll_cmds
        my @ll_cmds = ();
        for (my $i=0; $i<$cmd_length; $i++)
        {
           push (@ll_item_array, $attributes{XML_CMD . $i});
        }
     }

     # Add Log msg if there is
     push (@ll_item_array, $attributes{XML_LOG()});

     # Add the complete LL item
     push (@ll_array, \@ll_item_array);
  }

  # Store them to ll_equiv array
  @$ll_equiv = @ll_array;
}

# @brief Get status regarding feature if it's excluded or not
# @retval Update exclude_status flag
sub getFeaturestatus
{
  my ($feature, $targetDST, $exclude_status) = @_;

  # Determine how many exclude/available items exist for each feature
  my $exclude_keys = 0;
  my $available_keys = 0;
  foreach (${$feature}->children(XML_EXCLUDE())) { $exclude_keys++ }
  foreach (${$feature}->children(XML_AVAILABLE())) { $available_keys++ }

  # Check if this feature is excluded from the target
  # In database, we don't support to use exclude and available option under the same item
  $$exclude_status = FALSE;
  if ($exclude_keys > 0)
  {
    foreach (${$feature}->children(XML_EXCLUDE()))
    {
      if ($_->text eq $targetDST)
      {
        $$exclude_status = TRUE;
      }
    }
  }

  if ($available_keys > 0)
  {
    $$exclude_status = TRUE;
    foreach (${$feature}->children(XML_AVAILABLE()))
    {
      if ($_->text eq $targetDST)
      {
        $$exclude_status = FALSE;
      }
    }
  }
}

# @brief Get all SPL definitions from database in order to use them when searching expressions
# @retval Update database_spl_functions arrays
sub getDatabasedefinition
{
  my ($src_family, $dst_family, $database_spl_functions, $database_spl_literals) = @_;

  # Check the migration type
  my $migration_type = ($src_family eq $dst_family) ? IN_SERIE : CROSS_SERIE;

  # Parse function, literal and structure blocks
  getDatabasedefinition_Func   ($src_family, $dst_family, $migration_type, \@$database_spl_functions);
  getDatabasedefinition_Literal($src_family, $dst_family, $migration_type, \@$database_spl_literals);
  getDatabasedefinition_Struct ($src_family, $dst_family, $migration_type, \@$database_spl_literals);
}

# @brief Get functions SPL definitions from database in order to use them when searching expressions
# @retval Update database_spl_functions arrays
sub getDatabasedefinition_Func
{
  my ($src_family, $dst_family, $migration_type, $database_spl_functions) = @_;

  foreach my $file (@database_files)
  {
     # Create full file path
     my $file_path = $database_path . $file;

     # Get IP name from xml file name
     # PPP should be in uppercase
     my $ppp = uc ((split ('\.', $file))[0]);

     # Get IP versions from xml database
     my $src_ppp_version = getPPPversion($src_family, $ppp);
     my $dst_ppp_version = getPPPversion($dst_family, $ppp);

     # Shouldn't upgrade to family that hasn't the target IP
     if ($dst_ppp_version ne XML_NA)
     {
        # Set filter to search only functions
        my $handlers;
        if ($migration_type eq CROSS_SERIE)
        {
           $handlers = { "//COMMON/FUNCTIONS"                                               => sub { getDatabasedefinitionFunctionhandler(@_, $dst_family, $migration_type, '', \@$database_spl_functions); },
                         "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/FUNCTIONS"  => sub { getDatabasedefinitionFunctionhandler(@_, $dst_family, $migration_type, '', \@$database_spl_functions); },
                         "//SPECIFIC/VERSION[\@NAME='" . $dst_ppp_version . "']/FUNCTIONS"  => sub { getDatabasedefinitionFunctionhandler(@_, $dst_family, $migration_type, '', \@$database_spl_functions); }
                       };
        }
        else
        {
           $handlers = { "//COMMON/FUNCTIONS"                                               => sub { getDatabasedefinitionFunctionhandler(@_, $dst_family, $migration_type, '', \@$database_spl_functions); },
                         "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/FUNCTIONS"  => sub { getDatabasedefinitionFunctionhandler(@_, $dst_family, $migration_type, '', \@$database_spl_functions); }
                       };
        }

        my $twig = new XML::Twig(TwigHandlers => $handlers);

        if(!safe_parsefile($twig, $file_path))
        {
          printErrorAndExit("Failed to parse $file_path.\n$@\n", MSG_EMPTY);
        }
     }
  }
}

# @brief Handler of getDatabasedefinition_Func()
# @retval None
sub getDatabasedefinitionFunctionhandler
{
  my ($twig, $ele, $dst_family, $migration_type, $report, $database_spl_functions) = @_;

  # Dumps all features
  foreach my $feature ($ele->children) { push (@$database_spl_functions, $report . $feature->first_child(XML_SPL())->att(XML_NAME())); }

  $twig->purge;
}

# @brief Get literal SPL definitions from database in order to use them when searching expressions
# @retval Update database_spl_literals arrays
sub getDatabasedefinition_Literal
{
  my ($src_family, $dst_family, $migration_type, $database_spl_literals) = @_;

  foreach my $file (@database_files)
  {
     # Create full file path
     my $file_path = $database_path . $file;

     # Get IP name from xml file name
     # PPP should be in uppercase
     my $ppp = uc ((split ('\.', $file))[0]);

     # Get IP versions from xml database
     my $src_ppp_version = getPPPversion($src_family, $ppp);
     my $dst_ppp_version = getPPPversion($dst_family, $ppp);

     # Shouldn't upgrade to family that hasn't the target IP
     if ($dst_ppp_version ne XML_NA)
     {
        # Set filter to search only literals
        my $handlers;
        if ($migration_type eq CROSS_SERIE)
        {
           $handlers = { "//COMMON/LITERALS"                                               => sub { getDatabasedefinitionLiteralhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_literals); },
                         "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/LITERALS"  => sub { getDatabasedefinitionLiteralhandler(@_, $dst_family, $migration_type, '[N/A]', \@$database_spl_literals); },
                         "//SPECIFIC/VERSION[\@NAME='" . $dst_ppp_version . "']/LITERALS"  => sub { getDatabasedefinitionLiteralhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_literals); }
                       };
        }
        else
        {
           $handlers = { "//COMMON/LITERALS"                                               => sub { getDatabasedefinitionLiteralhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_literals); },
                         "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/LITERALS"  => sub { getDatabasedefinitionLiteralhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_literals); }
                       };
        }

        my $twig = new XML::Twig(TwigHandlers => $handlers);

        if(!safe_parsefile($twig, $file_path))
        {
          printErrorAndExit("Failed to parse $file_path.\n$@\n", MSG_EMPTY);
        }
     }
  }
}

# @brief Handler of getDatabasedefinition_Literal()
# @retval None
sub getDatabasedefinitionLiteralhandler
{
  my ($twig, $ele, $dst_family, $migration_type, $report, $database_spl_literals) = @_;

  # Get backup for reporting handler
  my $report_backup = $report;

  # Dumps all features
  foreach my $feature ($ele->children)
  {
    # Check if this feature is excluded from the target
    my $exclude_status = FALSE;
    getFeaturestatus(\$feature, $dst_family, \$exclude_status);
    if ($exclude_status == TRUE) { $report = '[N/A]'; }

    # No possible N/A expressions for IN-SERIE migration type
    unless (($migration_type eq IN_SERIE) && ($report eq '[N/A]'))
    {
      push (@$database_spl_literals, $report . $feature->first_child(XML_SPL())->text);
    }

    # Reset report value
    $report = $report_backup;
  }

  $twig->purge;
}

# @brief Get structure SPL definitions from database in order to use them when searching expressions
# @retval Update database_spl_literals arrays
sub getDatabasedefinition_Struct
{
  my ($src_family, $dst_family, $migration_type, $database_spl_struct) = @_;

  foreach my $file (@database_files)
  {
     # Create full file path
     my $file_path = $database_path . $file;

     # Get IP name from xml file name
     # PPP should be in uppercase
     my $ppp = uc ((split ('\.', $file))[0]);

     # Get IP versions from xml database
     my $src_ppp_version = getPPPversion($src_family, $ppp);
     my $dst_ppp_version = getPPPversion($dst_family, $ppp);

     # Shouldn't upgrade to family that hasn't the target IP
     if ($dst_ppp_version ne XML_NA)
     {
        # Set filter to search only structures
        my $handlers;
        if ($migration_type eq CROSS_SERIE)
        {
           $handlers = { "//COMMON/STRUCTURES"                                               => sub { getDatabasedefinitionStructhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_struct); },
                         "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/STRUCTURES"  => sub { getDatabasedefinitionStructhandler(@_, $dst_family, $migration_type, '[N/A]', \@$database_spl_struct); },
                         "//SPECIFIC/VERSION[\@NAME='" . $dst_ppp_version . "']/STRUCTURES"  => sub { getDatabasedefinitionStructhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_struct); }
                       };
        }
        else
        {
           $handlers = { "//COMMON/STRUCTURES"                                               => sub { getDatabasedefinitionStructhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_struct); },
                         "//SPECIFIC/VERSION[\@NAME='" . $src_ppp_version . "']/STRUCTURES"  => sub { getDatabasedefinitionStructhandler(@_, $dst_family, $migration_type, '',      \@$database_spl_struct); }
                       };
        }

        my $twig = new XML::Twig(TwigHandlers => $handlers);

        if(!safe_parsefile($twig, $file_path))
        {
          printErrorAndExit("Failed to parse $file_path.\n$@\n", MSG_EMPTY);
        }
     }
  }
}

# @brief Handler of getDatabasedefinition_Struct()
# @retval None
sub getDatabasedefinitionStructhandler
{
  my ($twig, $ele, $dst_family, $migration_type, $report, $database_spl_struct) = @_;

  # Get backup for reporting handler
  my $report_backup = $report;

  # Dumps all features
  foreach my $feature ($ele->children)
  {
    # Dumps all fields available
    foreach my $field ($feature->children)
    {
      # Check if this feature is excluded from the target
      my $exclude_status = FALSE;
      getFeaturestatus(\$field, $dst_family, \$exclude_status);
      if ($exclude_status == TRUE) { $report = '[N/A]'; }

      # No possible N/A expressions for IN-SERIE migration type
      unless (($migration_type eq IN_SERIE) && ($report eq '[N/A]'))
      {
        push (@$database_spl_struct, $report . '[F_STRUCT]' . $field->first_child(XML_SPL())->text);
      }
      
      # Reset report value
      $report = $report_backup;
    }
  }

  $twig->purge;
}

# @brief Find concerned XML database from expression
# @retval 0: Not Found 
#         1: Found
sub getXMLname
{
  my ($literal, $file) = @_;
  $$file = lc ((split ('_', $literal))[0]);

  # Exception for RI_ tag
  if ($$file eq "ri") { $$file = "syscfg"; }
  $$file .= ".xml";

  my $tmp = quotemeta($$file);
  return (grep (/^$tmp/, @database_files));
}

# @brief Get correspond IP version from xml ppp_version database
# @retval IP version string
sub getPPPversion
{
  my ($family, $ppp) = @_;

  my $ppp_version;
  # Set filter to search only ppp version
  my $handlers = { 'IPVERSION/'. $family . '/' . $ppp  => sub { xmlpppversionHandler( @_, \$ppp_version); } };
  my $twig = new XML::Twig(TwigHandlers => $handlers);

  if(!safe_parsefile($twig, $ppp_ver_database_path))
  {
    printErrorAndExit("Failed to parse $ppp_ver_database_path.\n$@\n", MSG_EMPTY);
  }

  $ppp_version = XML_NA if $ppp_version eq "";

  return $ppp_version;
}

# @brief Handler of getPPPversion()
# @retval None
sub xmlpppversionHandler
{
  my ($twig, $ele, $ppp_version) = @_;

  $$ppp_version = $ele->att(XML_NAME());

  $twig->purge;
}

# @brief Remove sub family reference
# @retval LL family
sub removeSubfamily
{
  my ($targetDST) = @_;
  if (length ($targetDST) > 7) { chop ($targetDST); }
  return (lc ($targetDST));
}

######################################################
# Overload XML Twig APIs to prevent concurrent access
######################################################
sub safe_parsefile
{ 
  my ($twig, $file) = @_;
  eval { parsefile($twig, $file); } ;
  return $@ ? $twig->_reset_twig_after_error : $twig;
}

sub parsefile 
{
  my ($self, $file) = @_;
  local(*FILE);
  while (open(FILE, $file) != 1) { }
  flock(S, LOCK_EX );
  binmode(FILE);
  my @ret;
  my $ret;

  $self->{Base} = $file;

  if (wantarray) {
    eval {
      @ret = $self->parse(*FILE, @_);
    };
  }
  else {
    eval {
      $ret = $self->parse(*FILE, @_);
    };
  }
  my $err = $@;
  close(FILE);
  die $err if $err;
  
  return unless defined wantarray;
  return wantarray ? @ret : $ret;
}

###########################################################################################################
#                                     Files processing subroutines
###########################################################################################################

# @brief Get database xml files paths
# @retval file list (array)
sub getDatabasefiles
{
  my ($database_path) = @_;
  # Open the database directory
  opendir (DIR, $database_path) or die 'Couldn\'t open the database directory !';
  # Find xml files
  my @fileslist = grep(/\.xml$/, readdir(DIR));
  # Remove includes.xml and ppp_versions.xml from the array
  @fileslist = grep(!/includes/, @fileslist);
  @fileslist = grep(!/ppp_versions/, @fileslist);
  close (DIR);
  if (@fileslist == 0) { printErrorAndExit("No database exist !", MSG_EMPTY); }
  return @fileslist;
}

# @brief Get all files exist under directory
# @retval file list (array)
sub getSrcfiles
{
  my $path = $_[0];

  # Find recursively files (even sub directory)
  my @fileslist;
  find({ wanted => sub {if ((-f $_) and (grep (/\.[ch]$/, $_))) {push @fileslist, $_;}}, no_chdir => 1 }, $path);
  if (@fileslist == 0) { printErrorAndExit("No .c/.h files exist in the directory !", MSG_EMPTY); }
  return @fileslist;
}

# @brief Retrieve all lines from file
# @retval file lines (in_all_lines array)
sub getAlllinesfromfile
{
  my ($filepath, $in_all_lines) = @_;

  # Open code source file
  open(IN, $filepath) or die "Cannot open the file !";

  # Read it line by line
  while (<IN>)
  {
    # Push each one in array
    push (@$in_all_lines, $_);
  }

  # Close the file
  close(IN);
}

# @brief Copy legacy files and directory
# @retval None
sub copyLegacyfiles
{
  my ($legacy_path, $out_dir) = @_;

  # Update path
  $out_dir .= "/Legacy/";

  # Delete old directory
  if (-d $out_dir) { rmtree($out_dir); }

  # Create directory
  make_path($out_dir);

  # Copy files
  dircopy($legacy_path, $out_dir)
        or die "Cannot copy $legacy_path to $out_dir !\n";
}

# @brief Copy HAL conf and ll_includes files
# @retval None
sub copyCubefiles
{
  my ($targetDST, $hal_conf_dir, $file, $in_dir, $out_dir) = @_;

    # Extract only directory path
    my @tmp_paths = split /\\|\//, $file;
    pop @tmp_paths;
    my $out_conf_dir = join ('/', @tmp_paths);

    # Update path to refer to output directory
    $in_dir       =~ s/\\/\//g;
    $out_dir      =~ s/\\/\//g;
    $in_dir       = quotemeta($in_dir);
    $out_conf_dir =~ s/$in_dir/$out_dir/;

    # Remove sub family reference
    $targetDST = removeSubfamily($targetDST);

    # Find the correct hal_conf.h file
    my @hal_files = getSrcfiles($hal_conf_dir);
    my $filter = $targetDST . "xx_hal_conf.h";
    $filter = quotemeta($filter);
    my @hal_conf_path = grep (/$filter/, @hal_files);

    # Create directory
    if (! -d $out_conf_dir) { make_path($out_conf_dir); }
    else {
      # Delete old hal_conf.h file if exist
      my @tmp_hal_paths = split /\\|\//, $hal_conf_path[0];
      my $out_conf = $out_conf_dir . "\\" . pop @tmp_hal_paths;
      if (-e $out_conf) { unlink $out_conf; }
    }

    # Copy files
    copy($hal_conf_path[0], $out_conf_dir) or die "Cannot copy $hal_conf_path[0] to $out_conf_dir !\n";
}

# @brief Save file
# @retval None
sub printAlllinestofile
{
  my ($in_dir, $file, $out_dir, $out_all_lines) = @_;

  # Prepare output path
  $in_dir = quotemeta($in_dir);
  $file =~ s/$in_dir//;
  $out_dir .= $file;

  # Extract only directory path in order to create it if it doesn't exist
  my @tmp_paths = split /\\|\//, $out_dir;

  pop @tmp_paths;
  my $ll_dir = join ('/', @tmp_paths);

  # Create code source file directory
  make_path $ll_dir unless -d $ll_dir;

  # Update file permission to FULL ACCESS (R/W)
  chmod 0777, $out_dir;

  # Create new file
  open(OUT, ">".$out_dir) or die "Cannot open this file $out_dir ";

  # Write lines
  print OUT @$out_all_lines;

  # Close the file
  close(OUT);
}

# @brief Save log file
# @retval None
sub printLogfile
{
  my ($out_dir, $out_all_lines) = @_;

  # Create log file
  make_path $out_dir unless -d $out_dir;
  my $log_file = $out_dir . '/log.txt';

  # Update file permission to FULL ACCESS (R/W)
  chmod 0777, $log_file;

  # Create new file
  open(LOG, ">". $log_file) or die "Cannot open this file $log_file";

  # Write lines
  print LOG @$out_all_lines;

  # Close the file
  close(LOG);
}

###########################################################################################################
#                                     Command line subroutines
###########################################################################################################

# @brief Get command line arguments
# @retval targetSRC, targetDST, infile, outfile
sub getArguments
{
my ($targetSRC, $targetDST, $infile, $outfile, $cmd_header, $cmd_color) = @_;

GetOptions (
              'help'      => \&helpHandler,
              'fsrc=s'    => \$$targetSRC,
              'fdst=s'    => \$$targetDST,
              'psrc=s'    => \$$infile,
              'pdst=s'    => \$$outfile,
              'header=s'  => \$$cmd_header,
              'color=s'   => \$$cmd_color,
              'ver'       => sub { print VERSION; exit; }
           ) or printErrorAndExit("Error in command line arguments !", MSG_EMPTY);
           
 if (($$targetSRC eq '') and ($$targetDST eq '') and ($$infile eq '') and ($$outfile eq '')) { helpHandler(); }

 if ($$targetSRC ne '')
 {
   if (!looks_like_stm32_family($$targetSRC)) { printErrorAndExit("Wrong STM32 family", MSG_EMPTY); }
 }
 else { printErrorAndExit("Missing target source", MSG_EMPTY); }

 if ($$targetDST ne '')
 {
   if (!looks_like_stm32_family($$targetDST)) { printErrorAndExit("Wrong STM32 family", MSG_EMPTY); }
 }
 else { printErrorAndExit("Missing target destination", MSG_EMPTY); }

 # Make target to uppercase
 $$targetSRC = uc ($$targetSRC);
 $$targetDST = uc ($$targetDST);

 if (! -d $$infile) { printErrorAndExit("Missing path file argument or path name doesn't exist", MSG_EMPTY); }

 # Create new directory if not exist
 if (! -d $$outfile) { make_path $$outfile or printErrorAndExit("Failed to create path: $$outfile", MSG_EMPTY); }
}

# @brief Check target value
# @retval 0::FAIL and 1::PASS
sub looks_like_stm32_family
{
  my $family = $_[0];

  if (grep (/^stm32/i, $family)) { return 1; }
  return 0;
}

# @brief handler of getArguments
# @retval None
sub helpHandler
{
  my ($opt_name, $opt_value) = @_;
  print 'SYNOPSIS' . "\n";
  print '       This tool allows the migration of STM32 projects based on Standard Peripheral Library (SPL)' . "\n";
  print '       to STM32Cube Low Layer drivers (STM32Cube_LL)' . "\n\n";
  print 'DESCRIPTION' . "\n";
  print '       Users whose have developed theirs STM32 projects around SPL framework need to upgrade them to the STM32Cube framework.' . "\n";
  print '       STM32Cube_LL driver is the replacement of the SPL, it offers low-level APIs at registers level in an organized,' . "\n";
  print '       simpler and clearer way when compared to simple direct register accesses. It offers as well peripherals initialization APIs' . "\n";
  print '       similar at functional level to what is offered by the SPL, but in a more optimized way.' . "\n";
  print '       This tool parses C files and searches for equivalence for SPL APIs existing in the user code source.' . "\n";
  print '       It supports migrating of literals, structures and functions.' . "\n\n";
  print 'TASKS' . "\n";
  print '       --fsrc : Set the current STM32 family' . "\n";
  print '       --fdst : Set the target STM32 family' . "\n";
  print '       --psrc : Set the directory path where code sources based on SPL exist' . "\n";
  print '       --pdst : Set the directory path where migrated sources will be stored' . "\n\n";
  print '       -------------------------------------- EXAMPLE --------------------------------------' . "\n\n";
  print '       To migrate from STM32F4 to STM32L4, you need to type this command line' . "\n";
  print '       perl spl2ll_converter.pl --fsrc=STM32F4 --fdst=STM32L4 --psrc=".\SPL_PRJ" --pdst=".\LL_PRJ"' . "\n\n";
  print 'LICENSE' . "\n";
  print '       <h2><center>&copy; Copyright (c) 2017 STMicroelectronics International N.V. ' . "\n";
  print '       All rights reserved.</center></h2>' . "\n";
  print "\n";
  print '       Redistribution and use in source and binary forms, with or without ' . "\n";
  print '       modification, are permitted, provided that the following conditions are met:' . "\n";
  print "\n";
  print '       1. Redistribution of source code must retain the above copyright notice, ' . "\n";
  print '          this list of conditions and the following disclaimer.' . "\n";
  print '       2. Redistributions in binary form must reproduce the above copyright notice,' . "\n";
  print '          this list of conditions and the following disclaimer in the documentation' . "\n";
  print '          and/or other materials provided with the distribution.' . "\n";
  print '       3. Neither the name of STMicroelectronics nor the names of other ' . "\n";
  print '          contributors to this software may be used to endorse or promote products ' . "\n";
  print '          derived from this software without specific written permission.' . "\n";
  print '       4. This software, including modifications and/or derivative works of this ' . "\n";
  print '          software, must execute solely and exclusively on microcontroller or' . "\n";
  print '          microprocessor devices manufactured by or for STMicroelectronics.' . "\n";
  print '       5. Redistribution and use of this software other than as permitted under ' . "\n";
  print '          this license is void and will automatically terminate your rights under ' . "\n";
  print '          this license. ' . "\n";
  print "\n";
  print '       THIS SOFTWARE IS PROVIDED BY STMICROELECTRONICS AND CONTRIBUTORS "AS IS" ' . "\n";
  print '       AND ANY EXPRESS, IMPLIED OR STATUTORY WARRANTIES, INCLUDING, BUT NOT ' . "\n";
  print '       LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A ' . "\n";
  print '       PARTICULAR PURPOSE AND NON-INFRINGEMENT OF THIRD PARTY INTELLECTUAL PROPERTY' . "\n";
  print '       RIGHTS ARE DISCLAIMED TO THE FULLEST EXTENT PERMITTED BY LAW. IN NO EVENT ' . "\n";
  print '       SHALL STMICROELECTRONICS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,' . "\n";
  print '       INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT' . "\n";
  print '       LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, ' . "\n";
  print '       OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF ' . "\n";
  print '       LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING ' . "\n";
  print '       NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,' . "\n";
  print '       EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.' . "\n";
  exit;
}

###########################################################################################################
#                                         User reporting API
###########################################################################################################

# @brief Print a warning message on console and in log
# @retval None
sub printWarn
{
  my ($line_count, $exp, $type, $warning) = @_;

  # Need to increment line counter since we start with 0
  printColor('bold yellow');
  printLog(ALL, "       [WARNING]");
  printColor('reset');

  my $msg_tmp = " -- Line " . ($line_count + 1) . " -- \"$exp\" ";
  my $msg_length = length($msg_tmp) + 16;
  my @xml_msg = split (/\\n/, $type);

  printLog(ALL, $msg_tmp);
  printLog(ALL, $xml_msg[0] . "\n");

  my $count_tmp = scalar @xml_msg - 1;
  my $count_tmp_array = 1;
  while ($count_tmp > 0)
  {
    # Add whitespace in console
    my $tmp_size = $msg_length;
    while ($tmp_size) { printLog(ALL, " "); $tmp_size--;}

    printLog(ALL, $xml_msg[$count_tmp_array] . "\n");

    # Increment counters
    $count_tmp_array++;
    $count_tmp--;
  }

  # Increment warning value
  $$warning++;
}

# @brief Print an error message on console and in log
# @retval None
sub printError
{
  my ($line_count, $exp, $type, $error) = @_;

  # Need to increment line counter since we start with 0
  printColor('bold red');
  printLog(ALL, "       [ERROR]");
  printColor('reset');
  printLog(ALL, " -- Line " . ($line_count + 1) . " -- \"$exp\" $type\n");

  # Increment error value
  $$error++;
}

# @brief Print an error message on console and exit
# @retval None
sub printErrorAndExit
{
 printColor('bold red');
 printLog(ALL, $_[0] . "\n");
 printLog(ALL, $_[1]);
 printColor('reset');
 exit;
}

# @brief Print upgrading status message on console and in log
# @retval None
sub printUpgradestatus
{
 my ($files, $nochange_files, $error, $warning, $time_start) = @_;

 printColor('reset');
 printLog(ALL, "\n\nStatistics : All Files = $files | Updated Files = " . ($files - $nochange_files) . " | Errors = $error | Warnings = $warning | Migrated in " . (time() - $time_start) . " sec\n");
 printColor('reset');

 if ($error == 0)
 {
   printColor('bold green');
   printLog(ALL, MSG_SUCCES);
   printColor('reset');
 }
 else
 {
   printColor('bold red');
   printLog(ALL, MSG_FAIL);
   printColor('reset');
 }
}

# @brief Print header message on console and in log
# @retval None
sub printHeader
{
  my ($print_support) = @_;

  printColor('reset');
  printLog($print_support, "\n=============================================================================\n");
  printColor('reset on_green');
  printLog($print_support, "                           " . VERSION . "                           ");
  printColor('reset');
  printLog($print_support, "\n");
  printColor('reset on_green');
  printLog($print_support, "                    " . COPYRIGHTS . "                     ");
  printColor('reset');
  printLog($print_support, "\n");
  printLog($print_support, "=============================================================================\n\n");
}

# @brief Print command line information (directory/family) on console and in log
# @retval None
sub printCommandlineinfo
{
  my ($targetSRC, $targetDST, $in_dir, $out_dir, $files_number, $cmd_header) = @_;
  my $print_support = ALL;

  # Print only into file
  if ($cmd_header eq NO) { $print_support = FILE; }

  printHeader($print_support);

  printColor('reset');
  printLog($print_support, "Family                : from $targetSRC to $targetDST\n");
  my(@dirs_in) = File::Spec->splitdir($in_dir);
  printLog($print_support, "Source directory      : \\" . $dirs_in[-1] . "\n");

  my(@dirs_out) = File::Spec->splitdir($out_dir);
  printLog($print_support, "Destination directory : \\" . $dirs_out[-1] . "\n");
  printLog($print_support, "\n \n");

  printColor('reset');
  printLog(ALL, "Updating user files ...\n");
  printColor('reset');
}

# @brief Print parsing filename
# @retval None
sub printFilename
{
  my ($in_dir, $file) = @_;

  # Remove the source directory
  $in_dir = quotemeta($in_dir);
  $file =~ s/$in_dir[\/\\]//;

  printColor('reset');
  printLog(ALL, "     Parsing \"$file\"\n");
}

# @brief Print migration status for each file message on console and in log
# @retval None
sub printFileprocess
{
  my ($update, $error, $warning) = @_;

  printColor('reset');
  printLog(ALL, "     => ");
  if ($update eq MSG_DONE) { printColor('bold green'); } else { printColor('bold cyan'); }
  printLog(ALL, "$update");

  if (($$error > 0) && ($$warning > 0))
  {
    printColor('reset');
    printLog(ALL, " (");

    printColor('bold red');
    printLog(ALL, "$$error ERRORS");

    printColor('reset');
    printLog(ALL, " | ");

    printColor('bold yellow');
    printLog(ALL, "$$warning WARNINGS");

    printColor('reset');
    printLog(ALL, ")");
  }
  elsif ($$error > 0)
  {
    printColor('reset');
    printLog(ALL, " (");

    printColor('bold red');
    printLog(ALL, "$$error ERRORS");

    printColor('reset');
    printLog(ALL, ")");
  }
  elsif ($$warning > 0)
  {
    printColor('reset');
    printLog(ALL, " (");

    printColor('bold yellow');
    printLog(ALL, "$$warning WARNINGS");

    printColor('reset');
    printLog(ALL, ")");
  }

  printColor('reset');
  printLog(ALL, "\n");
}

# @brief Print a message for system_stm32xxx.c and stm32xxxx_hal_conf.h
# @retval None
sub printFileWarning
{
  my ($in_dir, $file, $targetDST) = @_;

  # Remove the source directory
  $in_dir = quotemeta($in_dir);
  $file =~ s/$in_dir[\/\\]//;
  $file = "     " . $file . " => ";

  # Remove sub family reference
  $targetDST = uc (removeSubfamily($targetDST));

  printColor('reset');
  printLog(ALL, $file);

  if (grep /system/, $file)
  {
    printColor('bold cyan');
    printLog(ALL, "Please use system_" . lc ($targetDST) . "xx.c available under STM32Cube firmware (/Templates_LL/Src/)\n");
    printColor('reset');
  }
  else
  {
    printColor('bold cyan');
    printLog(ALL, "Replaced with ll_includes.h and " . lc ($targetDST) . "xx_hal_conf.h\n");
    printColor('reset');
  }
}

sub printColor
{
   my ($string) = @_;
   if ($cmd_color ne NO) { print color($string); }
}

# @brief Print a message on console and in log
# @retval None
sub printLog
{
  my ($support, $string) = @_;

  if ($support eq ALL)
  {
    # Add log line
    push (@log_all_lines, $string);
    print "$string";
    select()->flush();
  }
  elsif ($support eq TERMINAL)
  {
    print "$string";
    select()->flush();
  }
  elsif ($support eq FILE)
  {
    push (@log_all_lines, $string);
  }
}
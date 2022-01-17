#!/bin/bash
#
# This bash script converts uvprojx file from the command line into one cprj file per target
# the build.sh script is called for each target
#
# Pre-requisites:
# - bash shell (for Windows: install git for Windows)
# - source <CMSIS Build installation>/etc/setup

version=0.10.0

# header
echo "($(basename "$0")): Build MDK Project $version (C) 2020 ARM"

usage() {
  echo "Usage:"
  echo "  cbuild_uvprojx.sh <projectname>.uvprojx"
  echo ""
  echo "  <projectname>.uvprojx : uVision Project filename"
  echo "  --merge               : build with ccmerge"
}

OS=$(uname -s)
if [[ ($OS == "Linux" && ! $(grep Microsoft <<< $(uname -a))) || ($OS == "Darwin") ]]
  then
  echo "error: MDK is only available on Windows"
  exit 1
fi

if [ -z ${MDK_ROOT+x} ]; then
  echo "error: MDK_ROOT environment variable not set. Cannot locate uvision.com"
  exit 1
fi

merge=0

# arguments
for i in "$@"
do
  case $i in
    *.uvprojx)
      filedir=$(dirname "$i")
      filename=$(basename "$i" .uvprojx)
      shift
    ;;
    --merge)
      merge=1
      shift
    ;;
    --h)
      usage
      exit 0
    ;;
    ?|-*|--*)
      usage
      exit 0
    ;;
  esac
done

if [ -z ${filename+x} ]
  then
  echo "error: missing required argument <projectname>.uvprojx"
  usage
  exit 1
fi

if [ ! -f "$filedir/$filename.uvprojx" ]
  then
  echo "error: uVision5 project file $filedir/$filename.uvprojx not found"
  exit 1
fi

# all commands need to run in filedir
pushd "${filedir}"

# remove all cprj files, we generate cprj for all uvprojx targets
rm -f *.cprj

# convert uvprojx into one cprj file per target
"$MDK_ROOT/UV4/uvision.com" -ep "$filename".uvprojx
if [ $? -ne 0 ]
  then
  echo "uVision conversion from uvprojx to cprj files failed"
  popd
  exit 1
fi

projects=$(ls *.cprj)

errcnt=0
cnt=0
for project in $projects
  do
    echo " -------------------------------------------------------------------- "
    echo " calling cbuild.sh for "$project" "
    echo " -------------------------------------------------------------------- "
    cnt=$((cnt+1))

  if [ $merge -eq 0 ]
    then
    cbuild.sh "$project"
    else
    cbuild.sh "$project" --merge
  fi

  if [ $? -ne 0 ]
    then
    errcnt=$((errcnt+1))
    echo "cbuild.sh for "$project" failed"
    continue
  fi
done

echo "builds completed for:"
echo "$projects"
echo "passed: $((cnt-errcnt)) failed: $errcnt"

popd

if [ $errcnt -gt 0 ]
  then
  exit 1
  else
  exit 0
fi

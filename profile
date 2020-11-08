# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
# and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

if [ "$PS1" ]; then
  if [ "$BASH" ] && [ "$BASH" != "/bin/sh" ]; then
    # The file bash.bashrc already sets the default PS1.
    # PS1='\h:\w\$ '
    if [ -f /etc/bash.bashrc ]; then
      . /etc/bash.bashrc
    fi
  else
    if [ "`id -u`" -eq 0 ]; then
      PS1='# '
    else
      PS1='$ '
    fi
  fi
fi

# The default umask is now handled by pam_umask.
# See pam_umask(8) and /etc/login.defs.

if [ -d /etc/profile.d ]; then
  for i in /etc/profile.d/*.sh; do
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
#export LIBVA_DRIVER_NAME=vdpau 
#export VDPAU_DRIVER=radeonsi
#export VDPAU_DRIVER=va_gl  DOES NOT WORK
#export VDPAU_DRIVER=radeonsi
export JAVA_HOME=/opt/jre1.8.0_45/bin/
export USE_CCACHE=1
export CCACHE_DIR="/home/maddocks/.ccache"
export CC="ccache gcc"
export CXX="ccache g++"
#export CFLAGS="-O2 -march=bdver2 -m64"
export PATH="/usr/lib/ccache:/opt/codesourcery-toolchain/bin:/opt/gcc-linaro-arm-linux-gnueabihf-4.9-2014.09_linux/bin/:$PATH"


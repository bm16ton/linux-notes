-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

Format: 3.0 (quilt)
Source: network-manager
Binary: network-manager, network-manager-dev, libnm0, libnm-dev, gir1.2-nm-1.0, network-manager-config-connectivity-debian, network-manager-config-connectivity-ubuntu
Architecture: linux-any all
Version: 1.22.10-1ubuntu2.2
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Uploaders: Michael Biebl <biebl@debian.org>, Sjoerd Simons <sjoerd@debian.org>, Aron Xu <aron@debian.org>
Homepage: https://wiki.gnome.org/Projects/NetworkManager
Standards-Version: 4.5.0
Vcs-Browser: https://git.launchpad.net/network-manager
Vcs-Git: https://git.launchpad.net/network-manager -b ubuntu/focal
Testsuite: autopkgtest
Testsuite-Triggers: build-essential, dnsmasq-base, hostapd, isc-dhcp-client, iw, linux-headers-generic, python3, python3-dbusmock, python3-netaddr, rfkill, urfkill, wpasupplicant
Build-Depends: debhelper-compat (= 12), automake (>= 1.12), pkg-config, intltool, libglib2.0-dev (>= 2.32), ppp-dev (>= 2.4.7-1+1), libpolkit-gobject-1-dev, libpolkit-agent-1-dev (>= 0.97), libselinux1-dev, libaudit-dev, libgnutls28-dev (>= 2.12), uuid-dev, systemd (>= 185), libsystemd-dev (>= 209), libudev-dev (>= 175), libgirepository1.0-dev (>= 0.10.7-1~), gobject-introspection (>= 0.9.12-4~), python3-gi, libpsl-dev (>= 0.1), libcurl4-gnutls-dev (>= 7.24.0), gtk-doc-tools, perl, libyaml-perl, libglib2.0-doc, libmm-glib-dev (>= 0.7.991), libndp-dev, libreadline-dev, libnewt-dev (>= 0.52.15), libteam-dev (>= 1.9), libjansson-dev, libbluetooth-dev (>= 5), valac (>= 0.17.1.24), dbus <!nocheck>, python3-dbus <!nocheck>
Package-List:
 gir1.2-nm-1.0 deb introspection optional arch=linux-any
 libnm-dev deb libdevel optional arch=linux-any
 libnm0 deb libs optional arch=linux-any
 network-manager deb net optional arch=linux-any
 network-manager-config-connectivity-debian deb net optional arch=all
 network-manager-config-connectivity-ubuntu deb net optional arch=all
 network-manager-dev deb devel optional arch=all
Checksums-Sha1:
 4d39f390d486dbf5aa5fe89d1d05509ada653b59 4754868 network-manager_1.22.10.orig.tar.xz
 7973e7149a1c5ba1af14c00b3ce50454462ee988 70400 network-manager_1.22.10-1ubuntu2.2.debian.tar.xz
Checksums-Sha256:
 2b29ccc1531ba7ebba95a97f40c22b963838e8b6833745efe8e6fb71fd8fca77 4754868 network-manager_1.22.10.orig.tar.xz
 a03c202f19bb65ff77f1c596ebd9494fb100bec988c03a29f33d6c676b4cda49 70400 network-manager_1.22.10-1ubuntu2.2.debian.tar.xz
Files:
 b7b8875c3ef1db0989f78351ba3e8ad8 4754868 network-manager_1.22.10.orig.tar.xz
 17d6493a6a57369bae9e4d843572e31c 70400 network-manager_1.22.10-1ubuntu2.2.debian.tar.xz
Debian-Vcs-Browser: https://salsa.debian.org/utopia-team/network-manager
Debian-Vcs-Git: https://salsa.debian.org/utopia-team/network-manager.git
Original-Maintainer: Utopia Maintenance Team <pkg-utopia-maintainers@lists.alioth.debian.org>

-----BEGIN PGP SIGNATURE-----

iQIzBAEBCgAdFiEEPQ77lee1I38W6CJY41LVxRxQQdQFAl9iOqoACgkQ41LVxRxQ
QdRAFw//b5V1JVb15lSSMwewo66BZpJQR850UORdYxrjW8qUDBSviLnhWBzboTko
R9aYdHBGG9wlyWFF9p/dPYYS1NV1pqtHHE0WJYEVLPE87DM8G3Rl1RDWWo2OIRn8
Ez32wrwwKvHVpLYcJcuRkhd8ch6iRMW1I/sqYmtGtZZH1q1e0NivG1o5qKW1Tpi9
+0XH6WqsfJmditkxyunOYjJ5izWfPxLJ9gLGCG5PzFluIAo47HHR8VOD2wv1V/F/
xm5QO3Irzs/iNmxjDDSTLve8ZynhGWRdSM8/ANAoL57C/3SgB/pzaO57SubAxeOG
/ABhOsSYCnXyGapn1kH35Gr5JqjqhtOxjY5CgO71CFgsZ9JEHq6aEh2w/G4wMg13
WbG0aHt5n8DVgzXyz9l6DFxVBQ3JeXr7CiFlwtdxTgSWSwqmAp+ltuutvpAth6hp
zPPbnrFLaKCm6bQnwhWmUxouCzymGMZIV8ip50t1UVsosuq1HL7AFY/jA4LR1bJE
80ZQiaDMd2JKOWywQdJ/FYR/1x1IGHr9KYHLBIAM2f+aCARD1FyVyTMXvg07U+87
ksO0mWxABd7Y0c476hT3sX6hPA4/wsIlu18yE1aiYN72TBBwe345fcTDpXxpqb+j
+0jSUdKGizt83YSwpj1yfGNIMQGKmRMLuUg0ipjZ+WrFvfZIuiY=
=6X64
-----END PGP SIGNATURE-----

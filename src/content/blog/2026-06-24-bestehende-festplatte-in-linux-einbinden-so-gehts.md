---
author: Jan Hill
pubDatetime: 2026-06-24
modDatetime: 2026-06-24
title: Bestehende Festplatte in Linux einbinden – So geht's!
ogImage: Bestehende Festplatte in Linux einbinden – So geht's!
slug: festplatte-linux-einbinden
featured: false
draft: false
tags:
  - Festplatte
  - Proxmox
  - einbinden
  - Virtualisierung
description: In diesem Tutorial zeigen wir, wie man eine bestehende Festplatte
  dauerhaft in ein Linux-System einbindet. Dabei nutzen wir die UUID der
  Partition, damit das System beim Boot oder beim manuellen Nachladen die
  Festplatte automatisch mountet.
---
# Bestehende Festplatte in Linux einbinden – So geht's!

![](/assets/eHILL/images/firefox_5N7AFANJpH.png)



---

In diesem Tutorial zeigen wir, wie man eine bestehende Festplatte dauerhaft in ein Linux-System einbindet. Dabei nutzen wir die UUID der Partition, damit das System beim Boot oder beim manuellen Nachladen die Festplatte automatisch mountet.

## Alle vorhandenen Partitionen anzeigen

```
root@web:~# df -h
Dateisystem      Größe Benutzt Verf. Verw% Eingehängt auf
udev              955M       0  955M   0% /dev
tmpfs             196M     900K  195M   1% /run
/dev/vdb2         207G     9,9G  187G   6% /
tmpfs             977M     1,2M  976M   1% /dev/shm
efivarfs          256K      26K  226K  11% /sys/firmware/efi/efivars
tmpfs             5,0M       0  5,0M   0% /run/lock
tmpfs             1,0M       0  1,0M   0% /run/credentials/systemd-journald.service
/dev/vdb1         975M     8,8M  966M   1% /boot/efi
tmpfs             977M     128K  977M   1% /tmp
/dev/vda          458G      40G  395G  10% /mnt/hdd
tmpfs             1,0M       0  1,0M   0% /run/credentials/getty@tty1.service
tmpfs             196M      12K  196M   1% /run/user/0

```

Hier sehen wir bereits gemountete Partitionen. Besonders spannend ist der Pfad `/mnt/hdd`, der als Mount-Point für unsere Festplatte dient.

## UUID der Festplatte herausfinden

```
root@web:~# lsblk -lf /dev/vda
NAME FSTYPE FSVER LABEL UUID                                  FSAVAIL FSUSE% MOUNTPOINTS
vda  ext4   1.0        27697732-0ff8-45cd-a597-41bee4af4eeb  394,7G     9% /mnt/hdd

```

Mit `lsblk -lf /dev/<device>` lassen sich Partition und UUID auslesen. Die UUID ändert sich nur bei einer Formatierung oder gezielten Überschreibung der Partition.

## Festplatte dauerhaft in Linux eintragen

```
nano /etc/fstab
```



```
nano /etc/fstab
```

```
# In der fstab folgende Zeile eintragen:
UUID=27697732-0ff8-45cd-a597-41bee4af4eeb /mnt/mountpath ext4 defaults 0 0
```

Wichtig: Die Eintragung erfolgt in der Datei `/etc/fstab`, am besten über den Editor `nano`.

## Service neu laden und Mount durchführen

```
mkdir -p /mnt/mountpath
```

```
systemctl daemon-reload
```



```
mount -a
```

Damit wird die Festplatte sofort gemountet und beim nächsten Boot automatisch eingebunden.
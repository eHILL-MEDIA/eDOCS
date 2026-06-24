---
author: Jan Hill
pubDatetime: 2026-06-24
modDatetime: 2026-06-24
title: openvpn-tutorial
ogImage: OpenVPN - Linux einrichten, so geht's
slug: openvpn-tutorial
featured: false
draft: false
tags:
  - OpenVPN
  - Virtual Private Network
  - IP-Adresse
description: In diesem Tutorial zeige ich euch, wie ihr auf einem Linux Debian
  oder Ubuntu Server eine OpenVPN-Verbindung herstellt und diese mit einem
  Autostart verknüpft. Voraussetzung ist, dass ihr die OpenVPN Datei (.ovpn)
  bereit habt und auf euren Server hochgeladen habt.
---
In diesem Tutorial zeige ich euch, wie ihr auf einem Linux Debian oder Ubuntu Server eine OpenVPN-Verbindung herstellt und diese mit einem Autostart verknüpft. Voraussetzung ist, dass ihr die OpenVPN Datei (.ovpn) bereit habt und auf euren Server hochgeladen habt.

## Schritt 1: OpenVPN Datei hochladen

Öffnet euer SFTP/FTP Programm und zieht die `.ovpn` Datei auf euren Linux Server. Merkt euch unbedingt den genauen Pfad zur Datei, z. B. `/root/myvpn.ovpn`.

## Schritt 2: Skript erstellen

Kopiert folgendes Skript und erstellt eine Datei `openvpn_autostart.sh`:

```
#!/bin/bash
# Geschrieben von CodeJackr
# www.server-verstehen.de

clear
echo "********************************"
echo ""
read -p "Bitte gebe den Speicherpfad an, wo sich die OpenVPN Config befindet. z.B /root/myconfig.ovpn:  " config
echo ""
echo "********************************"
sleep 2
clear

apt-get update -y

if ! [ -d "/etc/openvpn" ]; then
    apt-get install openvpn -y
fi

sed -i 's/#AUTOSTART="all"/AUTOSTART="all"/g' /etc/default/openvpn

if [ ! $config == "" ] || [ ! $config == " " ]; then
    cp $config /etc/openvpn
    apt-get install sudo -y
    sudo printf "raw" > /etc/openvpn/pass
    sudo chmod 400 /etc/openvpn/pass
    cp $config /etc/openvpn/client.conf
    sudo systemctl enable openvpn@client.service
    sleep 1
    sudo systemctl daemon-reload
    clear

    read -p "Die Einrichtung ist abgeschlossen. Soll die VPN Verbindung jetzt hergestellt werden? Ja / Nein: " quiz
    if [ $quiz == "Ja" ] || [ $quiz == "JA" ] || [ $quiz == "ja" ] || [ $quiz == "jA" ]; then
        sudo service openvpn@client start
        clear
        RESULT="`wget -qO- https://get.jackr-api.de/checker/ip-lookup/`"
        echo "Folgende IP-Adresse ist jetzt im Internet einsehbar für diesen Server: $RESULT"
        read -p "[ENTER] OK"
        echo "INFO: Nach einem Server Neustart wird automatisch die VPN Verbindung wiederhergestellt!"
        read -p "[ENTER] OK"
    else
        echo "Vorgang abgebrochen!"
    fi
fi
```

Speichert die Datei mit **STRG + O** und beendet **STRG + X**.

## Schritt 3: Skript ausführbar machen

```
chmod 777 openvpn_autostart.sh
```

## Schritt 4: Skript starten

Startet das Skript mit folgendem Befehl und gebt den Pfad zu eurer `.ovpn` Datei an:

```
./openvpn_autostart.sh
```

 Wichtig: Nach der Einrichtung könnt ihr direkt entscheiden, ob die VPN-Verbindung jetzt hergestellt werden soll. Nach einem Neustart des Servers wird die Verbindung automatisch wiederhergestellt.

## Fazit

Der OpenVPN Autostart ist jetzt eingerichtet. Nach jedem Serverneustart wird die VPN-Verbindung automatisch aktiviert. Damit endet das Tutorial. Vielen Dank fürs Lesen!
# RPI Zero 2 W

**Présentation :**

https://www.domo-blog.fr/test-raspberry-pi-zero-2w-plus-rapide-puissant-de-tous-les-temps/

**Documentations :**

[Installation en headless](https://wiki.mchobby.be/index.php?title=Pi-Zero-Headless)

[RASP-PiOLED](https://wiki.mchobby.be/index.php?title=RASP-PiOLED)

[Rasp-Node-Red](https://wiki.mchobby.be/index.php?title=Rasp-Node-Red)

[broker Mosquitto sur le Raspberry Pi](https://www.domo-blog.fr/comment-creer-un-serveur-mqtt-sur-le-raspberry-pi-avec-mosquitto/)

**Achat :**

[RPI Zero 2 W avec header : 21€](https://shop.mchobby.be/fr/pi-zero-12wwh/2334-raspberry-pi-zero-2-w-avec-header-wireless-cam-port-3232100023345.html)

[RPI Zero 2 W sans header : 20,45€](https://shop.mchobby.be/fr/pi-zero-12wwh/2333-pi-zero-2-w-minimal-pack-3232100023338.html)

**Installation OS**

#### pi-imager

1. Télécharger/Installer Raspberry PI Imager
2. Choisir Raspberry Pi OS Lite 64-bit
3. Advanced Options 3.1. 'username : rtk', 'password : B@5e' 3.2. Set hostname 'rpi02w.local' 3.3 ssh, keyboard, WLAN

ou

Installer l'[image de jancelin](https://github.com/CentipedeRTK/pi-gen_RTKbase/releases) :


    Download Base_GNSS_X_X.zip
    Flash Micro SD with Etcher
    Connect GNSS antenna (USB) on Raspberry Pi
    Connect ethernet on Raspberry Pi
    Insert Micro SD on Raspberry Pi
    Powered
    Wait =~ 3 min ( connect a screen to follow the installation)
    Open a web browser (Firefox)

et se connecter en ssh:

http://basegnss.local

mdp: admin
```bash
ssh basegnss@basegnss.local

mdp: basegnss!
```

**Add some Swap**

https://nebl.io/neblio-university/enabling-increasing-raspberry-pi-swap/

```bash
# Temporarily Stop Swap:
sudo dphys-swapfile swapoff

# edit the file /etc/dphys-swapfile and modify the variable CONF_SWAPSIZE to 1024:
sudo nano /etc/dphys-swapfile

# Initialize Swap File
sudo dphys-swapfile setup

# Start Swap
sudo dphys-swapfile swapon
```

**Adafruit PiUART**\*

https://learn.adafruit.com/adafruit-piuart-usb-console-and-power-add-on-for-raspberry-pi

#### config.txt

Adafruit PiUART is an USB Console and Power Add-on for Raspberry Pi.

It needs uart to be enabled to run.

To do so, please modify /boot/config.txt and add at the bottom, last line 'enable_uart=1'

It's also possible to do the modification via 'raspi-config' from the rpi.

#### Power and run the rpi Zero 2W

With the PiUART connected to rpi, wire usb cable to the PiUART.

RPI is now powered and is reachable via /dev/ttyUSB

To obtain a console, do :

```
sudo screen /dev/ttyUSB 115200
# And press Enter
```

You're in now !

#### Connect to Wifi

! Only 2.4 Ghz networks can be associated !

If wifi did not connect at first time, you need to configure it by cli

https://benjaminprevot.fr/blog/article/2020/04/18/definir-les-parametres-wi-fi-d-un-raspberry-pi-zero-w-sans-peripherique.html

1. From another linux, get config by calling :\*

```
wpa_passphrase xssid2connectx
```

2. Create 'wpa_supplicant.conf' file at /boot with :

```
country=FR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
  scan_ssid=1
  ssid="xssid2connectx"
  psk="xxxxxxxxxxxle_hash_obtenu_precedemmentxxxxxxxxxx"
}
```

Add "priority=1" option to give highest priority when use many networks

This will fill the file '' with correct parameters. ! Don't forget to delete the commented clear password !

But to

Best : https://www.linuxbabe.com/command-line/ubuntu-server-16-04-wifi-wpa-supplicant


#### SSH

If SSH is not enabled, just create a file at /boot named 'ssh'

```
cd /boot
sudo touch ssd
```

A partir de maintenant, on peut se connecter directement via ssh par le wifi (sans le PiUART)

#### Update

```
sudo apt update
sudo apt upgrade
sudo reboot
```

Si l'update renvoie l'erreur : "Release is not yet valid :
```bash
apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
```

#### Raspi-Config

```
sudo raspi-config
```

Performances -> gpu memory : 16 M

ou /boot/config.txt
```
gpu_mem=16 
```

#### UART

Pi Zero 2 W a le même micro controleur que le Pi3 et Pi4 = BCM2710A1. Conf [Ref](https://raspberrypi.stackexchange.com/questions/133918/how-many-usable-serial-ports-does-pi-zero-2-w-have)

Part défaut, l'UART0/ttyAMA0 est connecté au bluetooth et le Mini-UART/dev/ttyS0 to GPIOs 14 and 15 https://raspberrypi.stackexchange.com/questions/92505/impact-of-using-uart?rq=1

On veut (comme pour centipède) assigner le point de montage /ttyAMA0 aux GPIOs 14 et 15 Pour cela, on édite /boot/config.txt pour rajouter à la fin : ! Ici on ne peut plus utiliser plus PiUART !

```
enable_uart=1
dtoverlay=pi3-miniuart-bt
```

On ajoutera par la suite `ttyAMA0` comme "serial port" dans les settings de RTKBase"

édit : !! C'est `ttyACM0` qui est renseigné et utilisé par RTKBase !!


**Installation Docker**

1. Set up the repository

Update the apt package index and install packages to allow apt to use a repository over HTTPS:

```
sudo apt install gnupg-agent apt-transport-https ca-certificates curl software-properties-common python3-pip python3-setuptools --no-install-recommends
#Recommended packages:
#  packagekit python3-dev unattended-upgrades
```

2. Add Docker’s official GPG key:

```
 sudo mkdir -p /etc/apt/keyrings
 curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

3. Use the following command to set up the repository:

```
 echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. Install Docker Engine

```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin --no-install-recommends
```

5. Add your user to the docker group.

```
 sudo usermod -aG docker $USER
```

6. Add memory limit support Modify the /boot/cmdline.txt, add these two parameters :

```
cgroup_enable=memory swapaccount=1
```

7. Contrôle de la charge Memoire Avant l'installation de Docker, la charge mémoire était de 69 Mo Maintenant après l'installation de Docker , la mémoire utilisée est de : 112 Mo

8.  Pour gagner quelques Mega de RAM, on va réduire la mémoire alloué au GPU à 16 Mo. A ajouter dans /boot/config.txt :

```
gpu_mem=16
```

**Installation pisugar-power-manager** https://github.com/PiSugar/PiSugar/wiki/PiSugar2

[Desc](https://www.tindie.com/products/pisugar/pisugar-2-battery-for-raspberry-pi-zero/)

[3D Case](https://github.com/PiSugar/PiSugar/tree/master/model2) et [3D common](https://github.com/PiSugar/PiSugar/tree/master/model)

```
curl http://cdn.pisugar.com/release/pisugar-power-manager.sh | sudo bash
```

login/passwd : admin http://pi0_ip:8421

Python API : https://github.com/PiSugar/pisugar-server-py

**!! Note: make sure you are not running any PHAT or other program occupying i2c address 0x75 and 0x32. Writing unexpected data into this two address will cause damage.** https://learn.adafruit.com/scanning-i2c-addresses/raspberry-pi

https://www.teachmemicro.com/raspberry-pi-i2c/


#### Access Point by virtual wifi device

On va utiliser un container qui permet de mettre en place en même temps sur le RPI_0_2_W :
 . un  point d'access wifi
 . une connexion par client wifi
 

!! Avant de commenceer, il faut désactiver le service wpa_supplicant !!

 https://github.com/txn2/txwifi#disable-wpa_supplicant-on-raspberry-pi
```bash
# prevent wpa_supplicant from starting on boot
$ sudo systemctl mask wpa_supplicant.service

# rename wpa_supplicant on the host to ensure that it is not
# used.
sudo mv /sbin/wpa_supplicant /sbin/no_wpa_supplicant

# kill any running processes named wpa_supplicant
$ sudo pkill wpa_supplicant
``` 
-  Créer un dossier iotwifi
 
- Créer un fichier config : wificfg.json

```bash
{
    "dnsmasq_cfg": {
      "address": "/#/192.168.27.1",
      "dhcp_range": "192.168.27.100,192.168.27.150,1h",
      "vendor_class": "set:device,IoT"
    },
    "host_apd_cfg": {
       "ip": "192.168.27.1",
       "ssid": "rpi0w2",
       "wpa_passphrase":"raspberryPi",
       "channel": "6"
    },
      "wpa_supplicant_cfg": {
        "cfg_file": "/etc/wpa_supplicant/wpa_supplicant.conf"
    }
}
```
Ici l'ip qui sera donné à l'interface wifi du point d'access est : 192.168.27.1

- Créer et ajouter les réseaux dans le fichier : wpa_supplicant.conf

```bash
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=FR

network={
	ssid="Livebox-BE70"
	psk="wfbc5dLHx7AcuRQAMn"
}

network={
	ssid="nexus"
	psk="antibes06"
}
```

- Pull the IOT Wifi Docker Image
```bash
 docker pull cjimti/iotwifi
```

- Créer un fichier executable "activateWlan.sh"
```bash
#!/bin/bash

docker run -d --name iotwifi --privileged --net host \
    -v /home/basegnss/iotwifi/wificfg.json:/cfg/wificfg.json \
    -v /home/basegnss/iotwifi/wpa_supplicant.conf:/etc/wpa_supplicant/wpa_supplicant.conf \
    --restart=unless-stopped cjimti/iotwifi
```

Le dispositif va s'activer au démarrage du système : 
- créer un point d'access sur lequel on pourra se connecter 
- + se connecter à un point d'access dont on aura défini les paramètres de connexion.

**bonus**

On poura se connecter à l'API par "curl"

Connaitre l'état de connexion :
```bash
curl -w "\n" http://localhost-ouIP:8080/status
```
Scanner les point d'access environnant :
```bash
curl http://localhost-ouIP:8080/scan
```
Se connecter à un point d'accès :
```bash
curl -w "\n" -d '{"ssid":"nexus", "psk":"antibes06"}' \
     -H "Content-Type: application/json" \
     -X POST localhost-ouIP:8080/connect
```

## Overclocking RPI zero 2 w

https://shopmakergenix.blogspot.com/2021/11/raspberry-pi-zero-2-w-overclocking.html

```bash
sudo nano /boot/config.txt

# Overclock settings
# over_voltage=6
arm_freq=1200

# test with
watch -n 1 vcgencmd measure_clock arm
```

=================================  Pas besoin si on utilise l'image fournie par jancelin  ==========================

**Installation RTKBASE (if outside of Docker)**

[source RTKLIB] (https://github.com/rtklibexplorer/RTKLIB/tree/b34f) https://github.com/rtklibexplorer/RTKLIB/releases/tag/b34f

Installation will be perform step by step

1. dependencies

```
sudo ./install.sh --dependencies
```

2. Get RTKLIB from rtkexplorer and compile it

```
sudo ./install.sh --rtklib
```

**Installation RTKBASE inside Docker**

We need to shrink weight of final image before push it into production. We will use" arm64v8/debian:stable-slim" and "arm64v8/alpine:edge" base images for common packages. For python we will need some customization of "arm64v8/python:slim-buster" and "arm64v8/python:3.10-alpine3.16" to achieve lightweight final image to put into production.

```
docker pull arm64v8/debian:stable-slim
docker pull arm64v8/alpine:edge
docker pull arm64v8/python:slim-buster
docker pull arm64v8/python:3.10-alpine3.16
```
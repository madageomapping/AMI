import{_ as e,c as n,o as a,d as s}from"./app.985fc83f.js";const f='{"title":"RPI Zero 2 W","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overclocking RPI zero 2 w","slug":"overclocking-rpi-zero-2-w"}],"relativePath":"rpi02w.md"}',t={},o=s(`<h1 id="rpi-zero-2-w" tabindex="-1">RPI Zero 2 W <a class="header-anchor" href="#rpi-zero-2-w" aria-hidden="true">#</a></h1><p><strong>Pr\xE9sentation :</strong></p><p><a href="https://www.domo-blog.fr/test-raspberry-pi-zero-2w-plus-rapide-puissant-de-tous-les-temps/" target="_blank" rel="noopener noreferrer">https://www.domo-blog.fr/test-raspberry-pi-zero-2w-plus-rapide-puissant-de-tous-les-temps/</a></p><p><strong>Documentations :</strong></p><p><a href="https://wiki.mchobby.be/index.php?title=Pi-Zero-Headless" target="_blank" rel="noopener noreferrer">Installation en headless</a></p><p><a href="https://wiki.mchobby.be/index.php?title=RASP-PiOLED" target="_blank" rel="noopener noreferrer">RASP-PiOLED</a></p><p><a href="https://wiki.mchobby.be/index.php?title=Rasp-Node-Red" target="_blank" rel="noopener noreferrer">Rasp-Node-Red</a></p><p><a href="https://www.domo-blog.fr/comment-creer-un-serveur-mqtt-sur-le-raspberry-pi-avec-mosquitto/" target="_blank" rel="noopener noreferrer">broker Mosquitto sur le Raspberry Pi</a></p><p><strong>Achat :</strong></p><p><a href="https://shop.mchobby.be/fr/pi-zero-12wwh/2334-raspberry-pi-zero-2-w-avec-header-wireless-cam-port-3232100023345.html" target="_blank" rel="noopener noreferrer">RPI Zero 2 W avec header : 21\u20AC</a></p><p><a href="https://shop.mchobby.be/fr/pi-zero-12wwh/2333-pi-zero-2-w-minimal-pack-3232100023338.html" target="_blank" rel="noopener noreferrer">RPI Zero 2 W sans header : 20,45\u20AC</a></p><p><strong>Installation OS</strong></p><h4 id="pi-imager" tabindex="-1">pi-imager <a class="header-anchor" href="#pi-imager" aria-hidden="true">#</a></h4><ol><li>T\xE9l\xE9charger/Installer Raspberry PI Imager</li><li>Choisir Raspberry Pi OS Lite 64-bit</li><li>Advanced Options 3.1. &#39;username : rtk&#39;, &#39;password : B@5e&#39; 3.2. Set hostname &#39;rpi02w.local&#39; 3.3 ssh, keyboard, WLAN</li></ol><p>ou</p><p>Installer l&#39;<a href="https://github.com/CentipedeRTK/pi-gen_RTKbase/releases" target="_blank" rel="noopener noreferrer">image de jancelin</a> :</p><pre><code>Download Base_GNSS_X_X.zip
Flash Micro SD with Etcher
Connect GNSS antenna (USB) on Raspberry Pi
Connect ethernet on Raspberry Pi
Insert Micro SD on Raspberry Pi
Powered
Wait =~ 3 min ( connect a screen to follow the installation)
Open a web browser (Firefox)
</code></pre><p>et se connecter en ssh:</p><p><a href="http://basegnss.local" target="_blank" rel="noopener noreferrer">http://basegnss.local</a></p><p>mdp: admin</p><div class="language-bash"><pre><code><span class="token function">ssh</span> basegnss@basegnss.local

mdp: basegnss<span class="token operator">!</span>
</code></pre></div><p><strong>Add some Swap</strong></p><p><a href="https://nebl.io/neblio-university/enabling-increasing-raspberry-pi-swap/" target="_blank" rel="noopener noreferrer">https://nebl.io/neblio-university/enabling-increasing-raspberry-pi-swap/</a></p><div class="language-bash"><pre><code><span class="token comment"># Temporarily Stop Swap:</span>
<span class="token function">sudo</span> dphys-swapfile swapoff

<span class="token comment"># edit the file /etc/dphys-swapfile and modify the variable CONF_SWAPSIZE to 1024:</span>
<span class="token function">sudo</span> <span class="token function">nano</span> /etc/dphys-swapfile

<span class="token comment"># Initialize Swap File</span>
<span class="token function">sudo</span> dphys-swapfile setup

<span class="token comment"># Start Swap</span>
<span class="token function">sudo</span> dphys-swapfile <span class="token function">swapon</span>
</code></pre></div><p><strong>Adafruit PiUART</strong>*</p><p><a href="https://learn.adafruit.com/adafruit-piuart-usb-console-and-power-add-on-for-raspberry-pi" target="_blank" rel="noopener noreferrer">https://learn.adafruit.com/adafruit-piuart-usb-console-and-power-add-on-for-raspberry-pi</a></p><h4 id="config-txt" tabindex="-1">config.txt <a class="header-anchor" href="#config-txt" aria-hidden="true">#</a></h4><p>Adafruit PiUART is an USB Console and Power Add-on for Raspberry Pi.</p><p>It needs uart to be enabled to run.</p><p>To do so, please modify /boot/config.txt and add at the bottom, last line &#39;enable_uart=1&#39;</p><p>It&#39;s also possible to do the modification via &#39;raspi-config&#39; from the rpi.</p><h4 id="power-and-run-the-rpi-zero-2w" tabindex="-1">Power and run the rpi Zero 2W <a class="header-anchor" href="#power-and-run-the-rpi-zero-2w" aria-hidden="true">#</a></h4><p>With the PiUART connected to rpi, wire usb cable to the PiUART.</p><p>RPI is now powered and is reachable via /dev/ttyUSB</p><p>To obtain a console, do :</p><div class="language-"><pre><code>sudo screen /dev/ttyUSB 115200
# And press Enter
</code></pre></div><p>You&#39;re in now !</p><h4 id="connect-to-wifi" tabindex="-1">Connect to Wifi <a class="header-anchor" href="#connect-to-wifi" aria-hidden="true">#</a></h4><p>! Only 2.4 Ghz networks can be associated !</p><p>If wifi did not connect at first time, you need to configure it by cli</p><p><a href="https://benjaminprevot.fr/blog/article/2020/04/18/definir-les-parametres-wi-fi-d-un-raspberry-pi-zero-w-sans-peripherique.html" target="_blank" rel="noopener noreferrer">https://benjaminprevot.fr/blog/article/2020/04/18/definir-les-parametres-wi-fi-d-un-raspberry-pi-zero-w-sans-peripherique.html</a></p><ol><li>From another linux, get config by calling \u{1F617}</li></ol><div class="language-"><pre><code>wpa_passphrase xssid2connectx
</code></pre></div><ol start="2"><li>Create &#39;wpa_supplicant.conf&#39; file at /boot with :</li></ol><div class="language-"><pre><code>country=FR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
  scan_ssid=1
  ssid=&quot;xssid2connectx&quot;
  psk=&quot;xxxxxxxxxxxle_hash_obtenu_precedemmentxxxxxxxxxx&quot;
}
</code></pre></div><p>Add &quot;priority=1&quot; option to give highest priority when use many networks</p><p>This will fill the file &#39;&#39; with correct parameters. ! Don&#39;t forget to delete the commented clear password !</p><p>But to</p><p>Best : <a href="https://www.linuxbabe.com/command-line/ubuntu-server-16-04-wifi-wpa-supplicant" target="_blank" rel="noopener noreferrer">https://www.linuxbabe.com/command-line/ubuntu-server-16-04-wifi-wpa-supplicant</a></p><h4 id="ssh" tabindex="-1">SSH <a class="header-anchor" href="#ssh" aria-hidden="true">#</a></h4><p>If SSH is not enabled, just create a file at /boot named &#39;ssh&#39;</p><div class="language-"><pre><code>cd /boot
sudo touch ssd
</code></pre></div><p>A partir de maintenant, on peut se connecter directement via ssh par le wifi (sans le PiUART)</p><h4 id="update" tabindex="-1">Update <a class="header-anchor" href="#update" aria-hidden="true">#</a></h4><div class="language-"><pre><code>sudo apt update
sudo apt upgrade
sudo reboot
</code></pre></div><p>Si l&#39;update renvoie l&#39;erreur : &quot;Release is not yet valid :</p><div class="language-bash"><pre><code><span class="token function">apt-get</span> -o Acquire::Check-Valid-Until<span class="token operator">=</span>false -o Acquire::Check-Date<span class="token operator">=</span>false update
</code></pre></div><h4 id="raspi-config" tabindex="-1">Raspi-Config <a class="header-anchor" href="#raspi-config" aria-hidden="true">#</a></h4><div class="language-"><pre><code>sudo raspi-config
</code></pre></div><p>Performances -&gt; gpu memory : 16 M</p><p>ou /boot/config.txt</p><div class="language-"><pre><code>gpu_mem=16 
</code></pre></div><h4 id="uart" tabindex="-1">UART <a class="header-anchor" href="#uart" aria-hidden="true">#</a></h4><p>Pi Zero 2 W a le m\xEAme micro controleur que le Pi3 et Pi4 = BCM2710A1. Conf <a href="https://raspberrypi.stackexchange.com/questions/133918/how-many-usable-serial-ports-does-pi-zero-2-w-have" target="_blank" rel="noopener noreferrer">Ref</a></p><p>Part d\xE9faut, l&#39;UART0/ttyAMA0 est connect\xE9 au bluetooth et le Mini-UART/dev/ttyS0 to GPIOs 14 and 15 <a href="https://raspberrypi.stackexchange.com/questions/92505/impact-of-using-uart?rq=1" target="_blank" rel="noopener noreferrer">https://raspberrypi.stackexchange.com/questions/92505/impact-of-using-uart?rq=1</a></p><p>On veut (comme pour centip\xE8de) assigner le point de montage /ttyAMA0 aux GPIOs 14 et 15 Pour cela, on \xE9dite /boot/config.txt pour rajouter \xE0 la fin : ! Ici on ne peut plus utiliser plus PiUART !</p><div class="language-"><pre><code>enable_uart=1
dtoverlay=pi3-miniuart-bt
</code></pre></div><p>On ajoutera par la suite <code>ttyAMA0</code> comme &quot;serial port&quot; dans les settings de RTKBase&quot;</p><p>\xE9dit : !! C&#39;est <code>ttyACM0</code> qui est renseign\xE9 et utilis\xE9 par RTKBase !!</p><p><strong>Installation Docker</strong></p><ol><li>Set up the repository</li></ol><p>Update the apt package index and install packages to allow apt to use a repository over HTTPS:</p><div class="language-"><pre><code>sudo apt install gnupg-agent apt-transport-https ca-certificates curl software-properties-common python3-pip python3-setuptools --no-install-recommends
#Recommended packages:
#  packagekit python3-dev unattended-upgrades
</code></pre></div><ol start="2"><li>Add Docker\u2019s official GPG key:</li></ol><div class="language-"><pre><code> sudo mkdir -p /etc/apt/keyrings
 curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
</code></pre></div><ol start="3"><li>Use the following command to set up the repository:</li></ol><div class="language-"><pre><code> echo \\
  &quot;deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \\
  $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null
</code></pre></div><ol start="4"><li>Install Docker Engine</li></ol><div class="language-"><pre><code>sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin --no-install-recommends
</code></pre></div><ol start="5"><li>Add your user to the docker group.</li></ol><div class="language-"><pre><code> sudo usermod -aG docker $USER
</code></pre></div><ol start="6"><li>Add memory limit support Modify the /boot/cmdline.txt, add these two parameters :</li></ol><div class="language-"><pre><code>cgroup_enable=memory swapaccount=1
</code></pre></div><ol start="7"><li><p>Contr\xF4le de la charge Memoire Avant l&#39;installation de Docker, la charge m\xE9moire \xE9tait de 69 Mo Maintenant apr\xE8s l&#39;installation de Docker , la m\xE9moire utilis\xE9e est de : 112 Mo</p></li><li><p>Pour gagner quelques Mega de RAM, on va r\xE9duire la m\xE9moire allou\xE9 au GPU \xE0 16 Mo. A ajouter dans /boot/config.txt :</p></li></ol><div class="language-"><pre><code>gpu_mem=16
</code></pre></div><p><strong>Installation pisugar-power-manager</strong> <a href="https://github.com/PiSugar/PiSugar/wiki/PiSugar2" target="_blank" rel="noopener noreferrer">https://github.com/PiSugar/PiSugar/wiki/PiSugar2</a></p><p><a href="https://www.tindie.com/products/pisugar/pisugar-2-battery-for-raspberry-pi-zero/" target="_blank" rel="noopener noreferrer">Desc</a></p><p><a href="https://github.com/PiSugar/PiSugar/tree/master/model2" target="_blank" rel="noopener noreferrer">3D Case</a> et <a href="https://github.com/PiSugar/PiSugar/tree/master/model" target="_blank" rel="noopener noreferrer">3D common</a></p><div class="language-"><pre><code>curl http://cdn.pisugar.com/release/pisugar-power-manager.sh | sudo bash
</code></pre></div><p>login/passwd : admin http://pi0_ip:8421</p><p>Python API : <a href="https://github.com/PiSugar/pisugar-server-py" target="_blank" rel="noopener noreferrer">https://github.com/PiSugar/pisugar-server-py</a></p><p><strong>!! Note: make sure you are not running any PHAT or other program occupying i2c address 0x75 and 0x32. Writing unexpected data into this two address will cause damage.</strong> <a href="https://learn.adafruit.com/scanning-i2c-addresses/raspberry-pi" target="_blank" rel="noopener noreferrer">https://learn.adafruit.com/scanning-i2c-addresses/raspberry-pi</a></p><p><a href="https://www.teachmemicro.com/raspberry-pi-i2c/" target="_blank" rel="noopener noreferrer">https://www.teachmemicro.com/raspberry-pi-i2c/</a></p><h4 id="access-point-by-virtual-wifi-device" tabindex="-1">Access Point by virtual wifi device <a class="header-anchor" href="#access-point-by-virtual-wifi-device" aria-hidden="true">#</a></h4><p>On va utiliser un container qui permet de mettre en place en m\xEAme temps sur le RPI_0_2_W : . un point d&#39;access wifi . une connexion par client wifi</p><p>!! Avant de commenceer, il faut d\xE9sactiver le service wpa_supplicant !!</p><p><a href="https://github.com/txn2/txwifi#disable-wpa_supplicant-on-raspberry-pi" target="_blank" rel="noopener noreferrer">https://github.com/txn2/txwifi#disable-wpa_supplicant-on-raspberry-pi</a></p><div class="language-bash"><pre><code><span class="token comment"># prevent wpa_supplicant from starting on boot</span>
$ <span class="token function">sudo</span> systemctl mask wpa_supplicant.service

<span class="token comment"># rename wpa_supplicant on the host to ensure that it is not</span>
<span class="token comment"># used.</span>
<span class="token function">sudo</span> <span class="token function">mv</span> /sbin/wpa_supplicant /sbin/no_wpa_supplicant

<span class="token comment"># kill any running processes named wpa_supplicant</span>
$ <span class="token function">sudo</span> <span class="token function">pkill</span> wpa_supplicant
</code></pre></div><ul><li><p>Cr\xE9er un dossier iotwifi</p></li><li><p>Cr\xE9er un fichier config : wificfg.json</p></li></ul><div class="language-bash"><pre><code><span class="token punctuation">{</span>
    <span class="token string">&quot;dnsmasq_cfg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;address&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/#/192.168.27.1&quot;</span>,
      <span class="token string">&quot;dhcp_range&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.27.100,192.168.27.150,1h&quot;</span>,
      <span class="token string">&quot;vendor_class&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;set:device,IoT&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;host_apd_cfg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
       <span class="token string">&quot;ip&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;192.168.27.1&quot;</span>,
       <span class="token string">&quot;ssid&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;rpi0w2&quot;</span>,
       <span class="token string">&quot;wpa_passphrase&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;raspberryPi&quot;</span>,
       <span class="token string">&quot;channel&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;6&quot;</span>
    <span class="token punctuation">}</span>,
      <span class="token string">&quot;wpa_supplicant_cfg&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;cfg_file&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;/etc/wpa_supplicant/wpa_supplicant.conf&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Ici l&#39;ip qui sera donn\xE9 \xE0 l&#39;interface wifi du point d&#39;access est : 192.168.27.1</p><ul><li>Cr\xE9er et ajouter les r\xE9seaux dans le fichier : wpa_supplicant.conf</li></ul><div class="language-bash"><pre><code><span class="token assign-left variable">ctrl_interface</span><span class="token operator">=</span>DIR<span class="token operator">=</span>/var/run/wpa_supplicant <span class="token assign-left variable">GROUP</span><span class="token operator">=</span>netdev
<span class="token assign-left variable">update_config</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">country</span><span class="token operator">=</span>FR

<span class="token assign-left variable">network</span><span class="token operator">=</span><span class="token punctuation">{</span>
	<span class="token assign-left variable">ssid</span><span class="token operator">=</span><span class="token string">&quot;Livebox-BE70&quot;</span>
	<span class="token assign-left variable">psk</span><span class="token operator">=</span><span class="token string">&quot;wfbc5dLHx7AcuRQAMn&quot;</span>
<span class="token punctuation">}</span>

<span class="token assign-left variable">network</span><span class="token operator">=</span><span class="token punctuation">{</span>
	<span class="token assign-left variable">ssid</span><span class="token operator">=</span><span class="token string">&quot;nexus&quot;</span>
	<span class="token assign-left variable">psk</span><span class="token operator">=</span><span class="token string">&quot;antibes06&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><ul><li>Pull the IOT Wifi Docker Image</li></ul><div class="language-bash"><pre><code> <span class="token function">docker</span> pull cjimti/iotwifi
</code></pre></div><ul><li>Cr\xE9er un fichier executable &quot;<a href="http://activateWlan.sh" target="_blank" rel="noopener noreferrer">activateWlan.sh</a>&quot;</li></ul><div class="language-bash"><pre><code><span class="token shebang important">#!/bin/bash</span>

<span class="token function">docker</span> run -d --name iotwifi --privileged --net <span class="token function">host</span> <span class="token punctuation">\\</span>
    -v /home/basegnss/iotwifi/wificfg.json:/cfg/wificfg.json <span class="token punctuation">\\</span>
    -v /home/basegnss/iotwifi/wpa_supplicant.conf:/etc/wpa_supplicant/wpa_supplicant.conf <span class="token punctuation">\\</span>
    --restart<span class="token operator">=</span>unless-stopped cjimti/iotwifi
</code></pre></div><p>Le dispositif va s&#39;activer au d\xE9marrage du syst\xE8me :</p><ul><li>cr\xE9er un point d&#39;access sur lequel on pourra se connecter</li><li><ul><li>se connecter \xE0 un point d&#39;access dont on aura d\xE9fini les param\xE8tres de connexion.</li></ul></li></ul><p><strong>bonus</strong></p><p>On poura se connecter \xE0 l&#39;API par &quot;curl&quot;</p><p>Connaitre l&#39;\xE9tat de connexion :</p><div class="language-bash"><pre><code><span class="token function">curl</span> -w <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>&quot;</span> http://localhost-ouIP:8080/status
</code></pre></div><p>Scanner les point d&#39;access environnant :</p><div class="language-bash"><pre><code><span class="token function">curl</span> http://localhost-ouIP:8080/scan
</code></pre></div><p>Se connecter \xE0 un point d&#39;acc\xE8s :</p><div class="language-bash"><pre><code><span class="token function">curl</span> -w <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>&quot;</span> -d <span class="token string">&#39;{&quot;ssid&quot;:&quot;nexus&quot;, &quot;psk&quot;:&quot;antibes06&quot;}&#39;</span> <span class="token punctuation">\\</span>
     -H <span class="token string">&quot;Content-Type: application/json&quot;</span> <span class="token punctuation">\\</span>
     -X POST localhost-ouIP:8080/connect
</code></pre></div><h2 id="overclocking-rpi-zero-2-w" tabindex="-1">Overclocking RPI zero 2 w <a class="header-anchor" href="#overclocking-rpi-zero-2-w" aria-hidden="true">#</a></h2><p><a href="https://shopmakergenix.blogspot.com/2021/11/raspberry-pi-zero-2-w-overclocking.html" target="_blank" rel="noopener noreferrer">https://shopmakergenix.blogspot.com/2021/11/raspberry-pi-zero-2-w-overclocking.html</a></p><div class="language-bash"><pre><code><span class="token function">sudo</span> <span class="token function">nano</span> /boot/config.txt

<span class="token comment"># Overclock settings</span>
<span class="token comment"># over_voltage=6</span>
<span class="token assign-left variable">arm_freq</span><span class="token operator">=</span><span class="token number">1200</span>

<span class="token comment"># test with</span>
<span class="token function">watch</span> -n <span class="token number">1</span> vcgencmd measure_clock arm
</code></pre></div><p>================================= Pas besoin si on utilise l&#39;image fournie par jancelin ==========================</p><p><strong>Installation RTKBASE (if outside of Docker)</strong></p><p>[source RTKLIB] (<a href="https://github.com/rtklibexplorer/RTKLIB/tree/b34f" target="_blank" rel="noopener noreferrer">https://github.com/rtklibexplorer/RTKLIB/tree/b34f</a>) <a href="https://github.com/rtklibexplorer/RTKLIB/releases/tag/b34f" target="_blank" rel="noopener noreferrer">https://github.com/rtklibexplorer/RTKLIB/releases/tag/b34f</a></p><p>Installation will be perform step by step</p><ol><li>dependencies</li></ol><div class="language-"><pre><code>sudo ./install.sh --dependencies
</code></pre></div><ol start="2"><li>Get RTKLIB from rtkexplorer and compile it</li></ol><div class="language-"><pre><code>sudo ./install.sh --rtklib
</code></pre></div><p><strong>Installation RTKBASE inside Docker</strong></p><p>We need to shrink weight of final image before push it into production. We will use&quot; arm64v8/debian:stable-slim&quot; and &quot;arm64v8/alpine:edge&quot; base images for common packages. For python we will need some customization of &quot;arm64v8/python:slim-buster&quot; and &quot;arm64v8/python:3.10-alpine3.16&quot; to achieve lightweight final image to put into production.</p><div class="language-"><pre><code>docker pull arm64v8/debian:stable-slim
docker pull arm64v8/alpine:edge
docker pull arm64v8/python:slim-buster
docker pull arm64v8/python:3.10-alpine3.16
</code></pre></div>`,131),r=[o];function p(i,l,c,u,d,g){return a(),n("div",null,r)}var m=e(t,[["render",p]]);export{f as __pageData,m as default};

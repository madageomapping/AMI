# Manuel 

## Elements matériels

### La puce ZED-F9P

La puce ZED-F9P de marque ublox est une puce bi-fréquences (L1+L2) intégrant le RTK permettant un positionnement centimétrique.

Le manuel est accessible [en ligne](https://cdn.sparkfun.com/assets/learn_tutorials/8/5/6/ZED-F9P_Integration_Manual.pdf).

Notre choix s'est arrêté sur le modèle [DP0601 RTK ZED-F9P GNSS](https://store-drotek.com/891-1023-rtk-zed-f9p-gnss.html) de chez Drotek, une entreprise localisé en Haute-Garonne

### Les antennes GNSS

Drotek propose des antennes multi-fréquences. On a choisi d'utiliser le modèle [DA910 multi-band GNSS Antenna](https://store-drotek.com/910-da-910-multiband-gnss-antenna.html) pour la Base et le modèle [DA233 multi-band GNSS Antenna](https://store-drotek.com/925-da233.html) pour la partie Rover.

### Raspberry Pi Zero 2 W

C'est la deuxième version du Rapberry Pi Zero avec des améliorations. Il est présenté comme 5 fois plus performant que le RpiZero.

Sortie en 2021, le Raspberry Pi Zero 2 W repose sur le même processeur que le RaspberryPi3 et il embarque 512Mo de Ram. Il integre un module wifi en 2.4 Ghz et un module bluetooth 4.2.

Il sera produit jusqu'en 2028.

### Pisugar 2

Module batterie pensé pour le RpiZero. Capable de fournir jusqu'à 2.4A, ce module sied parfaitement au RpiZero2W et peut alimenter notre projet complet en moyenne pendant 2h30min.

Plusieurs intérêts du Pi sugar2 :

    - il n'occupe pas de port GPIO, et il est très compact

    - il peut être chargé en même temps qu'il alimente le RpiZero2W, il se charge très bien en solaire

    - il a une page web dédié à la surveillance du niveau de la batterie

    - il a un bouton qui permet de programmer jusqu'à 3 actions

### LoRa

La partie radio communication sera assurée par un module LoRa. En effet cette technologie permet des communication longue distance (plrs kms) et une consommation d'énergie réduite.

Plusieurs tests sont actuellement faits sur les modèles : SX1268 LoRa HAT de chez Waveshare.
Prochainement, on va tester le modèle  E220-400T22D de chez Ebyte qui est presque 6 fois moins cher.

### Coût

Raspberry Pi Zero 2 W           = 18.90 € en temps normal

DP0601 RTK ZED-F9P GNSS         = 204 €

Pisugar 2                       = 39.99 €

DA910 multi-band GNSS Antenna   = 99.90 €

ou DA233 multi-band GNSS Antenna = 69.90 €

Module LoRa                     = 6 € ou 33 € si SX1268 433M LoRa HAT

Cables                          = 10 €

Total pour 1 module complet : 350 € ou 380 € selon l'antenne.

!! Le coût n'inclut pas les éventuels frais de livraison.

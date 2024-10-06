# Raspberry Pi setup

I'm doing some more experimentation with raspberry pi's around the house. Working on a base ubuntu setup, that is pretty close to what I would do with ubuntu on any other computer.

## Flashing

Install ubuntu-server through rpi-imager. Annoying rpi-imager doesn't work with sway, something about QT apps and security. I've been flashing from my work macbook so far. I'd like to get a better setup. I could do it from the command line with `dd` but I'm not sure how to replicate the settings presets that the imager has, which is especially nice for automatically connecting to wifi. Still, I should dig in and get this figured out.

## Wifi

Boot up and ssh in.

Replace netplan with networkmanager.

```bash
sudo apt install network-manager
```

In `/etc/netplan` make file `01-er-netplan-fix.yaml`. In that file put:

```yaml
network:
  version: 2
  renderer: NetworkManager
```

Remove the previous netplan file. Then run:

```bash
sudo netplan generate
sudo netplan apply
```

After it actually works restart and use a keyboard on the actual device to do the first nmcli and set the connection. This part is kind of annoying.

For some reason this also resuted in me having two IP addresses active on my local network. I needed to use the second one to ssh in.

## Set up tty autologin

```bash
sudo vi /etc/systemd/logind.conf
```

Uncomment `NAutoVTs=1` and `ReserveVT=2`. This is from https://ostechnix.com/ubuntu-automatic-login/.

Now create service

```bash
sudo mkdir /etc/systemd/system/getty@tty1.service.d/
```

Create and edit override

```bash
sudo vi /etc/systemd/system/getty@tty1.service.d/override.conf
```

Paste in this

```conf
[Service]
ExecStart=
ExecStart=-/sbin/agetty --noissue --autologin grant %I $TERM
Type=idle
```

That does it for tty1 which is all you need.

## Autostart tmux

In `~/.bashrc` add

```bash
if [ -z "$TMUX" ]; then
    tmux attach-session -t mux || tmux new-session -s mux
fi
```






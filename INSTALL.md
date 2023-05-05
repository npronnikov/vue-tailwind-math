#Introduction
In this guide, we’ll discuss how to install Nginx on your Ubuntu 22.04 server, adjust the firewall, manage the Nginx process, and set up server blocks for hosting more than one domain from a single server.

#Prerequisites
Before you begin this guide, you should have a regular, non-root user with sudo privileges configured on your server. You can learn how to configure a regular user account by following our Initial server setup guide for Ubuntu 22.04.

You will also optionally want to have registered a domain name before completing the last steps of this tutorial. To learn more about setting up a domain name with DigitalOcean, please refer to our Introduction to DigitalOcean DNS.

When you have an account available, log in as your non-root user to begin.

##Step 1 – Installing Nginx
Because Nginx is available in Ubuntu’s default repositories, it is possible to install it from these repositories using the apt packaging system.

Since this is our first interaction with the apt packaging system in this session, we will update our local package index so that we have access to the most recent package listings. Afterwards, we can install nginx:

`sudo apt update`
`sudo apt install nginx`  
Press Y when prompted to confirm installation. If you are prompted to restart any services, press ENTER to accept the defaults and continue. apt will install Nginx and any required dependencies to your server.

##Step 2 – Adjusting the Firewall
Before testing Nginx, the firewall software needs to be configured to allow access to the service. Nginx registers itself as a service with ufw upon installation, making it straightforward to allow Nginx access.

List the application configurations that ufw knows how to work with by typing:

`sudo ufw app list`  
You should get a listing of the application profiles:

Output  
`Available applications:`  
`Nginx Full`       
`Nginx HTTP`     
`Nginx HTTPS`    
`OpenSSH`   
As demonstrated by the output, there are three profiles available for Nginx:

Nginx Full: This profile opens both port 80 (normal, unencrypted web traffic) and port 443 (TLS/SSL encrypted traffic)
Nginx HTTP: This profile opens only port 80 (normal, unencrypted web traffic)
Nginx HTTPS: This profile opens only port 443 (TLS/SSL encrypted traffic)
It is recommended that you enable the most restrictive profile that will still allow the traffic you’ve configured. Right now, we will only need to allow traffic on port 80.

You can enable this by typing:

`sudo ufw allow 'Nginx HTTP'`  
You can verify the change by typing:

`sudo ufw status`  
The output will indicated which HTTP traffic is allowed:

Output
````
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
````

##Step 3 – Checking your Web Server
At the end of the installation process, Ubuntu 22.04 starts Nginx. The web server should already be up and running.

We can check with the systemd init system to make sure the service is running by typing:

`systemctl status nginx`  

Output  
````
● nginx.service - A high performance web server and a reverse proxy server  
Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)  
Active: active (running) since Fri 2022-03-01 16:08:19 UTC; 3 days ago  
Docs: man:nginx(8)  
Main PID: 2369 (nginx)  
Tasks: 2 (limit: 1153)  
Memory: 3.5M  
CGroup: /system.slice/nginx.service  
├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;  
└─2380 nginx: worker process
````  
As confirmed by this out, the service has started successfully. However, the best way to test this is to actually request a page from Nginx.  

You can access the default Nginx landing page to confirm that the software is running properly by navigating to your server’s IP address. If you do not know your server’s IP address, you can find it by using the icanhazip.com tool, which will give you your public IP address as received from another location on the internet:

`curl -4 icanhazip.com`  
When you have your server’s IP address, enter it into your browser’s address bar:

http://your_server_ip  
You should receive the default Nginx landing page:

###Nginx default page   

If you are on this page, your server is running correctly and is ready to be managed.

##Step 4 – Managing the Nginx Process
Now that you have your web server up and running, let’s review some basic management commands.

To stop your web server, type:  

`sudo systemctl stop nginx`  
To start the web server when  it is stopped, type:  

`sudo systemctl start nginx`  
To stop and then start the service again, type:  

`sudo systemctl restart nginx`  
If you are only making configuration changes, Nginx can often reload without dropping connections. To do this, type:  

`sudo systemctl reload nginx`  
By default, Nginx is configured to start automatically when the server boots. If this is not what you want, you can disable this behavior by typing:  

`sudo systemctl disable nginx`  
To re-enable the service to start up at boot, you can type:  

`sudo systemctl enable nginx`  
You have now learned basic management commands and should be ready to configure the site to host more than one domain.  

##Step 5 – Setting Up Server Blocks (Recommended)
When using the Nginx web server, server blocks (similar to virtual hosts in Apache) can be used to encapsulate configuration details and host more than one domain from a single server. We will set up a domain called your_domain, but you should replace this with your own domain name.  

Nginx on Ubuntu 22.04 has one server block enabled by default that is configured to serve documents out of a directory at `/var/www/html`. While this works well for a single site, it can become unwieldy if you are hosting multiple sites. Instead of modifying /var/www/html, let’s create a directory structure within /var/www for our your_domain site, leaving /var/www/html in place as the default directory to be served if a client request doesn’t match any other sites.

Create the directory for your_domain as follows, using the -p flag to create any necessary parent directories:

`sudo mkdir -p /var/www/your_domain/html`  
Next, assign ownership of the directory with the $USER environment variable:  

`sudo chown -R $USER:$USER /var/www/your_domain/html`  
The permissions of your web roots should be correct if you haven’t modified your umask value, which sets default file permissions. To ensure that your permissions are correct and allow the owner to read, write, and execute the files while granting only read and execute permissions to groups and others, you can input the following command:  

`sudo chmod -R 755 /var/www/your_domain`  
Next, create a sample index.html page using nano or your favorite editor:  

`nano /var/www/your_domain/html/index.html`  
Inside, add the following sample HTML:  
````
/var/www/your_domain/html/index.html
<html>
    <head>
        <title>Welcome to your_domain!</title>
    </head>
    <body>
        <h1>Success!  The your_domain server block is working!</h1>
    </body>
</html>
````
Save and close the file by pressing Ctrl+X to exit, then when prompted to save, Y and then Enter.

In order for Nginx to serve this content, it’s necessary to create a server block with the correct directives. Instead of modifying the default configuration file directly, let’s make a new one at /etc/nginx/sites-available/your_domain:  

`sudo nano /etc/nginx/sites-available/your_domain`  
Paste in the following configuration block, which is similar to the default, but updated for our new directory and domain name:  
````
/etc/nginx/sites-available/your_domain
server {
listen 80;
listen [::]:80;

        root /var/www/your_domain/html;
        index index.html index.htm index.nginx-debian.html;

        server_name your_domain www.your_domain;

        location / {
                try_files $uri $uri/ =404;
        }
}
````
Notice that we’ve updated the root configuration to our new directory, and the server_name to our domain name.

Next, let’s enable the file by creating a link from it to the sites-enabled directory, which Nginx reads from during startup:  

`sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/`  
Note: Nginx uses a common practice called symbolic links, or symlinks, to track which of your server blocks are enabled. Creating a symlink is like creating a shortcut on disk, so that you could later delete the shortcut from the sites-enabled directory while keeping the server block in sites-available if you wanted to enable it.

Two server blocks are now enabled and configured to respond to requests based on their listen and server_name directives (you can read more about how Nginx processes these directives here):

your_domain: Will respond to requests for your_domain and www.your_domain.
default: Will respond to any requests on port 80 that do not match the other two blocks.

Next, test to make sure that there are no syntax errors in any of your Nginx files:  

`sudo nginx -t`  
If there aren’t any problems, restart Nginx to enable your changes:  

`sudo systemctl restart nginx`  
or  
`sudo /etc/init.d/nginx restart`  
Nginx should now be serving your domain name.  

#How To Secure Nginx with Let's Encrypt on Ubuntu 20.04
Let’s Encrypt is a Certificate Authority (CA) that provides an easy way to obtain and install free TLS/SSL certificates, thereby enabling encrypted HTTPS on web servers. It simplifies the process by providing a software client, Certbot, that attempts to automate most (if not all) of the required steps. Currently, the entire process of obtaining and installing a certificate is fully automated on both Apache and Nginx.

In this tutorial, you will use Certbot to obtain a free SSL certificate for Nginx on Ubuntu 20.04 and set up your certificate to renew automatically.

This tutorial will use a separate Nginx server configuration file instead of the default file. We recommend creating new Nginx server block files for each domain because it helps to avoid common mistakes and maintains the default files as a fallback configuration.

##Prerequisites
To follow this tutorial, you will need:

- One Ubuntu 20.04 server set up by following this initial server setup for Ubuntu 20.04 tutorial, including a sudo-enabled non-root user and a firewall.

- A registered domain name. This tutorial will use example.com throughout. You can purchase a domain name from Namecheap, get one for free with Freenom, or use the domain registrar of your choice.

- Both of the following DNS records set up for your server. If you are using DigitalOcean, please see our DNS documentation for details on how to add them.

- An A record with example.com pointing to your server’s public IP address.
- An A record with www.example.com pointing to your server’s public IP address.
- Nginx installed by following How To Install Nginx on Ubuntu 20.04. Be sure that you have a server block for your domain. This tutorial will use /etc/nginx/sites-available/example.com as an example.

##Step 1 — Installing Certbot
The first step to using Let’s Encrypt to obtain an SSL certificate is to install the Certbot software on your server.

Install Certbot and it’s Nginx plugin with apt:  

`sudo apt install certbot python3-certbot-nginx`  
Certbot is now ready to use, but in order for it to automatically configure SSL for Nginx, we need to verify some of Nginx’s configuration.

##Step 2 — Confirming Nginx’s Configuration
Certbot needs to be able to find the correct server block in your Nginx configuration for it to be able to automatically configure SSL. Specifically, it does this by looking for a server_name directive that matches the domain you request a certificate for.

If you followed the server block set up step in the Nginx installation tutorial, you should have a server block for your domain at /etc/nginx/sites-available/example.com with the server_name directive already set appropriately.

To check, open the configuration file for your domain using nano or your favorite text editor:

`sudo nano /etc/nginx/sites-available/example.com`  
Find the existing server_name line. It should look like this:  
````
/etc/nginx/sites-available/example.com
...
server_name example.com www.example.com;
...
````
If it does, exit your editor and move on to the next step.  

If it doesn’t, update it to match. Then save the file, quit your editor, and verify the syntax of your configuration edits:

`sudo nginx -t`  
If you get an error, reopen the server block file and check for any typos or missing characters. Once your configuration file’s syntax is correct, reload Nginx to load the new configuration:

`sudo systemctl reload nginx`  
Certbot can now find the correct server block and update it automatically.  

Next, let’s update the firewall to allow HTTPS traffic.  

##Step 3 — Allowing HTTPS Through the Firewall
If you have the ufw firewall enabled, as recommended by the prerequisite guides, you’ll need to adjust the settings to allow for HTTPS traffic. Luckily, Nginx registers a few profiles with ufw upon installation.

You can see the current setting by typing:

`sudo ufw status`  
It will probably look like this, meaning that only HTTP traffic is allowed to the web server:

Output
````
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
To additionally let in HTTPS traffic, allow the Nginx Full profile and delete the redundant Nginx HTTP profile allowance:
````
`sudo ufw allow 'Nginx Full'`  
`sudo ufw delete allow 'Nginx HTTP'`  

Your status should now look like this:  

`sudo ufw status`
Output  
````
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
Next, let’s run Certbot and fetch our certificates.
````

##Step 4 — Obtaining an SSL Certificate
Certbot provides a variety of ways to obtain SSL certificates through plugins. The Nginx plugin will take care of reconfiguring Nginx and reloading the config whenever necessary. To use this plugin, type the following:

`sudo certbot --nginx -d example.com -d www.example.com`  
This runs certbot with the --nginx plugin, using -d to specify the domain names we’d like the certificate to be valid for.

If this is your first time running certbot, you will be prompted to enter an email address and agree to the terms of service. After doing so, certbot will communicate with the Let’s Encrypt server, then run a challenge to verify that you control the domain you’re requesting a certificate for.

If that’s successful, certbot will ask how you’d like to configure your HTTPS settings.

Output
````
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
````
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):  
Select your choice then hit ENTER. The configuration will be updated, and Nginx will reload to pick up the new settings. certbot will wrap up with a message telling you the process was successful and where your certificates are stored:

Output
````
IMPORTANT NOTES:
- Congratulations! Your certificate and chain have been saved at:
  /etc/letsencrypt/live/example.com/fullchain.pem
  Your key file has been saved at:
  /etc/letsencrypt/live/example.com/privkey.pem
  Your cert will expire on 2020-08-18. To obtain a new or tweaked
  version of this certificate in the future, simply run certbot again
  with the "certonly" option. To non-interactively renew *all* of
  your certificates, run "certbot renew"
- If you like Certbot, please consider supporting our work by:

  Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
  Donating to EFF:                    https://eff.org/donate-le
  Your certificates are downloaded, installed, and loaded. Try reloading your website using https:// and notice your browser’s security indicator. It should indicate that the site is properly secured, usually with a lock icon. If you test your server using the SSL Labs Server Test, it will get an A grade.
````
Let’s finish by testing the renewal process.

##Step 5 — Verifying Certbot Auto-Renewal
Let’s Encrypt’s certificates are only valid for ninety days. This is to encourage users to automate their certificate renewal process. The certbot package we installed takes care of this for us by adding a systemd timer that will run twice a day and automatically renew any certificate that’s within thirty days of expiration.

You can query the status of the timer with systemctl:  

`sudo systemctl status certbot.timer`  
Output
````
● certbot.timer - Run certbot twice daily
Loaded: loaded (/lib/systemd/system/certbot.timer; enabled; vendor preset: enabled)
Active: active (waiting) since Mon 2020-05-04 20:04:36 UTC; 2 weeks 1 days ago
Trigger: Thu 2020-05-21 05:22:32 UTC; 9h left
Triggers: ● certbot.service
````
To test the renewal process, you can do a dry run with certbot:  

`sudo certbot renew --dry-run`  
If you see no errors, you’re all set. When necessary, Certbot will renew your certificates and reload Nginx to pick up the changes. If the automated renewal process ever fails, Let’s Encrypt will send a message to the email you specified, warning you when your certificate is about to expire.

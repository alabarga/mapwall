openssl genrsa -out key_ca.pem 4096 #-des3 4096

openssl req -new -x509 -key key_ca.pem -out cert_ca.pem
-days 3650 -subj /C=XX/ST=XX/L=XXX/O=XX/OU=xx/CN=Layer\ 0/email=x...@xx.net
  -config ssl.conf  -extensions v3_ca_self


cp cert_ca.pem /usr/share/ca-certificates
nano /etc/ca-certificates.conf  // append cert_ca.pem
sudo update-ca-certificates --fresh
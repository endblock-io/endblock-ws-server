 
connect :
sudo ssh -i "key/keypair-endblock.pem" ec2-user@ec2-3-66-222-246.eu-central-1.compute.amazonaws.com


Send to server:
sudo scp -i key/keypair-endblock.pem /Users/jorgealcazar/Documents/GitHub/endblock-ws-server.zip ec2-user@ec2-3-66-222-246.eu-central-1.compute.amazonaws.com:/tmp/endblock-ws-server.zip

cp /tmp/endblock-ws-server.zip .

unzip endblock-ws-server.zip
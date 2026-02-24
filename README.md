# rockthesport-connector

## Building

The docker container is built automatically by Github Actions.

To deploy, merge the feature to main and tag a release:
```bash
VERSION=0.2.0
git tag -a v$VERSION -m "Release version $VERSION"
git push --tags
```

Then on the server, pull the new image and restart the service:

```bash
# Authenticate with GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Then pull the image
docker pull ghcr.io/admiral-digital/cha-rockthesport-connector:$VERSION

# Mark this version as the latest
docker image tag \
    ghcr.io/admiral-digital/cha-rockthesport-connector:$VERSION \
    ghcr.io/admiral-digital/cha-rockthesport-connector:latest

# Launch the new version
sudo systemctl restart rockthesport-connector.service && sudo journalctl -f -u rockthesport-connector
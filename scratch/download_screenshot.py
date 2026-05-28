import urllib.request
import sys

def download(url, filename):
    print(f"Downloading {url} to {filename}...")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(filename, 'wb') as f:
                while True:
                    chunk = response.read(1024 * 64)
                    if not chunk:
                        break
                    f.write(chunk)
        print("Download complete successfully.")
    except Exception as e:
        print(f"Error downloading: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    # Try pageshot first
    download('https://pageshot.site/v1/screenshot?url=https://gainlab.ltd&width=1280&height=800', 'gainlab.png')

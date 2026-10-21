import olefile
import zlib
import glob
import re

output = []
for f in sorted(glob.glob('extracted/*.hwp')):
    output.append(f"*** FILE: {f}")
    ole = olefile.OleFileIO(f)
    if ole.exists('PrvText'):
        prv = ole.openstream('PrvText').read().decode('utf-16le', errors='ignore')
        output.append("--- PrvText ---")
        output.append(prv)
    for entry in ole.listdir():
        if entry[0] == 'BodyText':
            data = ole.openstream(entry).read()
            try:
                decomp = zlib.decompress(data, -15)
            except Exception as e:
                decomp = data
            txt = decomp.decode('utf-16le', errors='ignore')
            chunks = re.findall(r'[\uac00-\ud7a30-9a-zA-Z\s\.,\(\)\[\]\{\}\-\_\:\;\/\'\"\%\<\>\=\+]+', txt)
            meaningful = [c.strip() for c in chunks if len(c.strip()) > 1]
            output.append(f"--- {entry} parsed ---")
            output.append('\n'.join(meaningful))

with open('hwp_extracted.txt', 'w', encoding='utf-8') as out:
    out.write('\n'.join(output))

print('Done writing hwp_extracted.txt')

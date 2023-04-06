
from pydantic import BaseModel

# class metadata():
m4a_acoustidfingerprint_key = '----:com.apple.iTunes:Acoustid Fingerprint'
m4a_acoustid_key = '----:com.apple.iTunes:Acoustid Id'
m4a_title_key = '©nam'
m4a_album_key = '©alb'
m4a_artist_key = '©ART'
m4a_album_artist_key = 'aART'
id3_acoustid_key = 'TXXX:Acoustid Id'
id3_acoustidfingerprint_key = 'TXXX:Acoustid Fingerprint'
id3_title_key = 'TIT2'
id3_album_key = 'TALB'
id3_artist_key = 'TPE1'
id3_album_artist_key = 'TPE2'

# need to add stripping to remove the validation
class Metadata(BaseModel):
    artist : str | None
    title : str | None
    acoustid : str | None
    album : str | None
    album_artist : str | None
    

class PotentialMetadatas(BaseModel):
    filename : str
    type: str
    potentialMetadata : list[Metadata | None ]

class ReturnType(BaseModel):
    error: str = ''
    results: list[PotentialMetadatas] = []

    
MUSIC_FILE_EXTENSIONS = ('.mp3', '.MP3', '.wav', '.WAV', '.m4a', '.cda')
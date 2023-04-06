import sys
# import time
import json
# simple argument echo script
# for v in sys.argv[1:]:
#   time.sleep(2)
# print(v
exampleInput = {
    'metadata': [
        {
            'filename': 'Black Belt Eagle Scout - Half Colored Hair.mp3',
            'type': 'mp3',
            'potentialMetadata': [
                {
                    'artist': 'Black Belt Eagle Scout',
                    'title': 'Half Colored Hair',
                    'acoustid': '12345',
                    'album': 'The Half-Colored Album',
                    'album_artist': 'Black Belt Eagle Scout'
                },
                {
                    'artist': 'Various Artists',
                    'title': 'Indie Gems',
                    'acoustid': '67890',
                    'album': 'Indie Hits',
                    'album_artist': 'Various Artists'
                }
            ]
        },
        {
            'filename': 'Black Belt Eagle Scout - At the Party.mp3',
            'type': 'mp3',
            'potentialMetadata': [
                {
                    'artist': 'Black Belt Eagle Scout',
                    'title': 'At the Party',
                    'acoustid': '54321',
                    'album': 'The Party Album',
                    'album_artist': 'Black Belt Eagle Scout'
                },
                {
                    'artist': 'Various Artists',
                    'title': 'Summer Jams',
                    'acoustid': '09876',
                    'album': 'Summer Mixtape',
                    'album_artist': 'Various Artists'
                }
            ]
        },
        {
            'filename': 'Black Belt Eagle Scout - Going to the Beach With Haley.mp3',
            'type': 'mp3',
            'potentialMetadata': [
                {
                    'artist': 'Black Belt Eagle Scout',
                    'title': 'Going to the Beach With Haley',
                    'acoustid': '13579',
                    'album': 'Beach Vibes',
                    'album_artist': 'Various Artists'
                },
                {
                    'artist': 'Various Artists',
                    'title': 'Chillout',
                    'acoustid': '24680',
                    'album': 'Chillout Mix',
                    'album_artist': 'Various Artists'
                }
            ]
        }
    ]
}

for line in sys.stdin:
    # print(json.dumps({'sleep': 5}))
    # time.sleep(5)
    print(json.dumps(json.loads(line)))
    # print(json.dumps(exampleInput))

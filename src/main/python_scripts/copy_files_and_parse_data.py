import sys
import json
import os
import logging

from g_inter import send_paths_to_googlesheet # pyright: ignore
from helper import find_potential_metadata, read_files_from_directory
from models import *
"""
This file receives its input as a json dumped through standard in.
"""




    # logging.basicConfig(filename=f'{os.path.dirname(__file__)}\\logs\\example.log', filemode='w', encoding='utf-8', level=logging.DEBUG)
# logging.basicConfig(
#     level=logging.DEBUG,
#     format="%(asctime)s [%(levelname)s] %(message)s",
#     handlers=[
#         logging.FileHandler(f'{os.path.dirname(__file__)}\\logs\\example.log', mode='w'),
#         logging.StreamHandler(sys.stderr)
#     ]
# )
    # logging.basicConfig(level=logging.DEBUG)
    # paths = [
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - At the Party.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - Going to the Beach With Haley.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - Half Colored Hair.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - I Said I Wouldn't Write This Song.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - My Heart Dreams.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - Real Lovin.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - Run It to Ya.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - Scorpio Moon.mp3",
    #     "C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\input\\Black Belt Eagle Scout - You're Me and I'm You.mp3",
    # ]

## START HERE:
paths : list[str] | None = None
for line in sys.stdin:
    paths = json.loads(line)

logging.debug(f'starting script: {os.path.basename(__file__)} with __name__ == {__name__}')
logging.debug(f'input args = {paths}')


rval = ReturnType()

TEMP_DIR : str = 'C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\test_songs\\temp'


if not paths:
    rval.error = 'error: could not parse paths'
    print(json.dumps(rval.dict()))
    exit(1)

# check to see if it's a directory, if it is, grab the contents of the directory
# currently read_files_from_directory DOES NOT discriminate musical vs nonmusical files
if len(paths) == 1 and os.path.isdir(paths[0]):
    paths = read_files_from_directory(paths[0])


# ensure that files are musical in nature, in the future this will convert them to mp3.
for path in paths:
    if path.endswith('mp3'):
        continue
    elif path.endswith(MUSIC_FILE_EXTENSIONS):
        # TODO: convert the files.
        ...
    else :
        # TODO: if it's an album cover, embed it inside the file.
        ...

# Parse
for path in paths:
    meta = find_potential_metadata(path)
    logging.debug(f'potential meta: {meta}')
    rval.results.append(meta)

# exampleInput = {
#     'metadata': [
#         {
#             'filename': 'Black Belt Eagle Scout - Half Colored Hair.mp3',
#             'type': 'mp3',
#             'potentialMetadata': [
#                 {
#                     'artist': 'Black Belt Eagle Scout',
#                     'title': 'Half Colored Hair',
#                     'acoustid': '12345',
#                     'album': 'The Half-Colored Album',
#                     'album_artist': 'Black Belt Eagle Scout'
#                 },
#                 {
#                     'artist': 'Various Artists',
#                     'title': 'Indie Gems',
#                     'acoustid': '67890',
#                     'album': 'Indie Hits',
#                     'album_artist': 'Various Artists'
#                 }
#             ]
#         },
#         {
#             'filename': 'Black Belt Eagle Scout - At the Party.mp3',
#             'type': 'mp3',
#             'potentialMetadata': [
#                 {
#                     'artist': 'Black Belt Eagle Scout',
#                     'title': 'At the Party',
#                     'acoustid': '54321',
#                     'album': 'The Party Album',
#                     'album_artist': 'Black Belt Eagle Scout'
#                 },
#                 {
#                     'artist': 'Various Artists',
#                     'title': 'Summer Jams',
#                     'acoustid': '09876',
#                     'album': 'Summer Mixtape',
#                     'album_artist': 'Various Artists'
#                 }
#             ]
#         },
#         {
#             'filename': 'Black Belt Eagle Scout - Going to the Beach With Haley.mp3',
#             'type': 'mp3',
#             'potentialMetadata': [
#                 {
#                     'artist': 'Black Belt Eagle Scout',
#                     'title': 'Going to the Beach With Haley',
#                     'acoustid': '13579',
#                     'album': 'Beach Vibes',
#                     'album_artist': 'Various Artists'
#                 },
#                 {
#                     'artist': 'Various Artists',
#                     'title': 'Chillout',
#                     'acoustid': '24680',
#                     'album': 'Chillout Mix',
#                     'album_artist': 'Various Artists'
#                 }
#             ]
#         }
#     ]
# }
# for line in sys.stdin:
# print(json.dumps(exampleInput))
print(json.dumps(rval.dict()))
exit(0)

# returnobj = {
#         'type': str(type(paths)),
#         'length' : len(paths)
#     }
# returnobj['test'] = []
# for i, path in enumerate(paths):
#     returnobj['test'].append({'index': i, 'path': path})

# print(json.dumps(returnobj))

# Look up the standard exit codes


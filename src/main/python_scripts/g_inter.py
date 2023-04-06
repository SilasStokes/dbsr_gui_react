import pygsheets
import pandas as pd

# globals:
gc = pygsheets.authorize(service_file='C:\\Users\\DBS Radio Intern\\code\\electron-exploration\\dbsr_gui\\python_scripts\\drive_api_key.json')

def send_paths_to_googlesheet(paths, sheet = 'test'):
    # Create empty dataframe
    df = pd.DataFrame()
    # Create a column
    df['paths'] = paths
    #open the google spreadsheet (where 'PY to Gsheet Test' is the name of my sheet)
    sh = gc.open('test')
    #select the first sheet 
    wks = sh[0]
    #update the first sheet with df, starting at cell B2. 
    wks.set_dataframe(df,(1,1))
    
if __name__ == '__main__':
    send_data_to_googlesheet()
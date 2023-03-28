import sys
import json

print(f"Number of arguments: {len(sys.argv)}")
print(f"Arguments: {sys.argv}")


    # We do argv[1] because on the server side, we sent the data as: ['./trasnfer.py', JSON.stringify(board_data)] 
def main():
    json_data = sys.argv[1]
    print('JSON DATA IS ' + str(json_data))
    array_data = json.loads(json_data)['array']

    print("Received 2D array in Python script:")
    print(array_data)

if __name__ == "__main__":
    main()


#!/usr/bin/python

from Snake_DQN import Agent
import numpy as np
import keras
import tensorflow as tf
import matplotlib.pyplot as plt
#import seaborn as sns

import sys, getopt, time, os, cv2, json, random

def main(argv):
    print("RL_snake.py is running")
    argument = ''
    usage = 'usage: RL_snake.py -f <sometext>'
    
    # parse incoming arguments
    try:
        opts, args = getopt.getopt(argv,"hf:",["foo="])
    except getopt.GetoptError:
        print(usage)
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print(usage)
            sys.exit()
        elif opt in ("-f", "--foo"):
            argument = arg

    # print output
    # print("Start : %s" % time.ctime())
    # time.sleep( 5 )
    # print('Foo is')
    # time.sleep( 5 )
    # print(argument)
    # print("End : %s" % time.ctime())

    # agent1 = Agent(gamma=0.99, epsilon=20.0,alpha=0.0005, input_dims=len(env.positions),
    #              n_actions=6, mem_size=1000000, batch_size=64, epsilon_end=0.01, agent_num='1')

    while True:
        json_file = open('transfer.json', "r")
        data = json.load(json_file)
        turn = data['turn']
        print(turn)
        json_file.close()

        if turn == 'py':
            data['move'] = random.choice(['UP','Down','LEFT','RIGHT', ''])
            data['turn'] = 'node'

            jsonFile = open("replayScript.json", "w+")
            jsonFile.write(json.dumps(data))
            jsonFile.close()
            print('AUTO_Move')

        else:
            pass


        # "file_name": "",
        # "move": "",
        # "turn": "node"

        # for p in data['people']:
        #     print('Name: ' + p['name'])
        #     print('Website: ' + p['website'])
        #     print('From: ' + p['from'])
        #     print('')
    

if __name__ == "__main__":
    main(sys.argv[1:])
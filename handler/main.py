import logging

test_val = 2
test_list = [1, 2, 3]

FORMAT = '%(asctime)-15s %(levelname)s: %(message)s'
logging.basicConfig(format=FORMAT, datefmt='%z %Y-%m-%d %H:%M:%S', filename='ESS.log', filemode='a', level=logging.INFO)
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
logging.error(f'{test_val}, {test_list}')
logging.critical('I am critical log')

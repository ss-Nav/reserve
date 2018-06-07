from flask import Flask
app = Flask(__name__)

import redis
r = redis.StrictRedis(host='Reserve.redis.cache.windows.net',
        port=6380, db=0, password='CuXrxyeDtPr80qkwgCUFhOvHWBbyyb+IVcSrrTKlbBs=', ssl=True)
r.set('foo', 'tsuyo')


@app.route('/')
def hello_world():
  # return 'Hello, World!' + str(r.get('foo'))
  return 'Hello, World!' + str(r.ping())

if __name__ == '__main__':
  app.run()
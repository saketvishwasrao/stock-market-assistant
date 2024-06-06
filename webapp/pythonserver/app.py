from flask import Flask, jsonify, request
import yfinance as yf

app = Flask(__name__)

@app.route('/chart', methods=['GET'])
def get_stock_data():
    ticker = request.args.get('ticker', default = 'TSLA', type = str)
    stock_data = yf.Ticker(ticker)

    historical_data = stock_data.history(period='1d', start='2022-01-01')
    closing_prices = historical_data['Close'].tolist()
    dates = historical_data.index.strftime('%Y-%m-%d').tolist()

    chart_data = []
    for date, price in zip(dates, closing_prices):
      chart_data.append({'date': date, 'price': price})

    return jsonify(chart_data)

if __name__ == '__main__':
    app.run(port=5000)


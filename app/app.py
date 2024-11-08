# ТЕБЕ СЮДА НЕ НАДО !!!

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


API_LIST = {
    1: 'http://services.niu.ranepa.ru/API/public/teacher/teachersAndGroupsList',
    2: 'http://example.com/api/anotherEndpoint',
}

@app.route('/api/proxy', methods=['GET'])
def proxy():
    url = request.args.get('url')
    number = request.args.get('number')

    # Проверяем, передан ли URL или число
    if url:
        target_url = url
    elif number and number.isdigit() and int(number) in API_LIST:
        target_url = API_LIST[int(number)]
    else:
        return jsonify({'error': 'Invalid input. Provide either a valid URL or a number.'}), 400

    try:
        # Перенаправляем запрос к целевому API
        response = requests.get(target_url)

        # Возвращаем ответ клиенту
        return (response.content, response.status_code, {'Content-Type': response.headers['Content-Type']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context='adhoc')  # Используйте ssl_context для HTTPS

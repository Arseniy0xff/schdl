from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Список доступных API с их методами
API_LIST = {
    1: {
        'url': 'http://services.niu.ranepa.ru/API/public/teacher/teachersAndGroupsList',
        'method': 'GET'
    },
    2: {
        'url': 'http://services.niu.ranepa.ru/API/public/teacher/getSchedule', 
        'method': 'POST'
    },
    3: {
        'url': 'http://services.niu.ranepa.ru/API/public/group/getSchedule', 
        'method': 'POST'
    },
}

@app.route('/api/proxy', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy():
    url = request.args.get('url')
    number = request.args.get('number')

    # Проверяем, передан ли URL или число
    if url:
        target_url = url
        method = request.method  # Используем метод запроса
    elif number and number.isdigit() and int(number) in API_LIST:
        target_url = API_LIST[int(number)]['url']
        method = API_LIST[int(number)]['method']
    else:
        return jsonify({'error': 'Invalid input. Provide either a valid URL or a number.'}), 400

    try:
        # Перенаправляем запрос к целевому API в зависимости от метода
        if method == 'GET':
            response = requests.get(target_url, params=request.args)
        elif method == 'POST':
            response = requests.post(target_url, json=request.get_json())
        elif method == 'PUT':
            response = requests.put(target_url, json=request.get_json())
        elif method == 'DELETE':
            response = requests.delete(target_url, json=request.get_json())
        else:
            return jsonify({'error': 'Unsupported method.'}), 405

        # Возвращаем ответ клиенту
        return (response.content, response.status_code, {'Content-Type': response.headers['Content-Type']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context='adhoc')  # Используйте ssl_context для HTTPS

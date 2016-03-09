/* This file defines functions about ajax call to back end
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 05.01.2016
 */

let request = require('superagent')

/* a simple get cookief function
 *
 * @param name String
 *
 * @return cookieValue String
 */
export function getCookie(name) {
    let cookieValue = null;

    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


/* login function 
 * 
 * @param username String
 * @param password String 
 * @callback Func(err, data)
 *
 */
export function UserLogin(username, password, callback){
  let csrftoken = getCookie('csrftoken')

  request
    .post('/user/api/login/')
    .send({ 'username': username, 'password': password })
    .set('X-CSRFToken',csrftoken)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* sign up function 
 *
 * @param username String
 * @param password String
 * @callback Func(err, data)
 *
 */
export function UserSignUp(username, password, callback){
  let csrftoken = getCookie('csrftoken')

  request
    .post('/user/api/signup/')
    .send({ 'username': username, 'password': password })
    .set('X-CSRFToken',csrftoken)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* logout function
 *
 * @callback Func(err, data)
 */
export function UserLogout(callback){
  let csrftoken = getCookie('csrftoken')

  request
    .delete('/user/api/login/')
    .set('X-CSRFToken',csrftoken)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}


/* change password function 
 *
 * @param password String new password
 * @callback Func(err, data)
 */
export function UserChangePassword(password, callback){
  let csrftoken = getCookie('csrftoken')

  request
    .patch('/user/api/signup/')
    .send({ 'password': password })
    .set('X-CSRFToken',csrftoken)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

function createQueryFactory(){
  let query_params_num = 0
  let query = '?'

  return (key, value) => {
    if(query_params_num != 0) {
      query += '&' 
    }

    query += key + '=' + value
    query_params_num += 1
    return query
  }
}

/* a function to get students
 * 
 * @param Object {'querykey': '..'...}
 * @callback Func(err, data)
 */
export function QueryStudents(params, callback){
  let url = '/scrl/api/students/'
  let queryFactory = createQueryFactory()
  let query = ''

  if(params['querykey'] && params['queryvalue'] !== undefined){
    queryFactory('querykey', params['querykey'])
    query = queryFactory('queryvalue', params['queryvalue'])
  }

  if(params['items']){
    query = queryFactory('items', params['items'])
  }
  
  if(params['page']){
    query = queryFactory('page', params['page'])
  }

  if(query.length > 0){
    url += query
  }

  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* get all courses
 *
 * @param params Object {'page':string, 'items':string,}
 * @callback Func(err, data)
 */
export function GetCourses(params,callback){
  let url = '/scrl/api/courses/'
  let queryFactory = createQueryFactory()
  let query = ''

  if(params['items']){
    query = queryFactory('items', params['items'])
  }
  
  if(params['page']){
    query = queryFactory('page', params['page'])
  }

  if(query.length > 0){
    url += query
  }

  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* get a student by student_num
 *
 * @param student_num String 
 * @callback Func(err, data)
 */
export function GetAStudent(student_num, callback){
  let url = '/scrl/api/student/' + student_num + '/'

  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

/* get a course by course_num
 *
 * @param course_num String
 * @callback Func(err, data)
 */
export function GetACourse(course_num, callback){
  let url = '/scrl/api/course/' + course_num + '/'

  request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      callback(err, res.body)
    })
}

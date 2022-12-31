export default class FetchingFunctions {
  constructor() {
    this.baseUrl = (process.env.NODE_ENV === "development") ? "http://127.0.0.1:8000" : ""
    this.token = this.getCookie('kfc')
    this.baseUrl = `${host}/api/v1/`
  }
  
  // Get document.cookie
  getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

  
  static GetCategories() {
    return (
      fetch(`${this.baseUrl}/get_categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }
 

  static GetItemImages(itemId) {
    return (
      fetch(`${this.baseUrl}/item_images/${itemId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  static GetDishItems(dishId) {
    return (
      fetch(`${this.baseUrl}/dish_items/${dishId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  static GetDeals() {
    return (
      fetch(`${this.baseUrl}/get_deals/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  // REGISTER
  static Register(body) {
    return (
      fetch(`${this.baseUrl}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        // return response.json()
      })
    )
  }

  // CHECK CURRENT TOKEN
  static CurrentUser() {
    return (
      fetch(`${this.baseUrl}/current_user/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${this.token}`
        },
      })
      .then(response => {
        // if (!response.ok) {
        //   throw Error(response.statusText)
        // }
        return response.json()
      })
    )
  }

  

  static Order(token, body) {
    return(
      fetch(`${this.baseUrl}/order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${token['kfc']}/`,
        },
        body: JSON.stringify(body),
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        console.log("Success")
        // return response.json()
      })
    )
  }

  static GetOrderHistory(token) {
    return(
      fetch(`${this.baseUrl}/order/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${token['kfc']}/`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  static G(uri) {
    return (
      fetch(`${this.baseUrl}/${uri}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  static GWT(uri, token) {
    return (
      fetch(`${this.baseUrl}/${uri}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token['kfc']}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
    )
  }

  // Log in, fetch Token 
  static P(uri, body) {
    return (
      fetch(`${this.baseUrl}/${uri}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

}

 
  // static GetCategoryItems(categoryId) {
  //   return (
  //     fetch(`${this.baseUrl}/category_items/${categoryId}/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     .then((response) => { // This way will stop promise if error occur
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json()
  //     })
  //   )
  // }

  // static GWI(uri, id) {
  //   return (
  //     fetch(`${this.baseUrl}/${uri}/${id}/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     .then((response) => { // This way will stop promise if error occur
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json()
  //     })
  //   )
  // }



  // Log in, fetch Token 
  // static Login(body) {
  //   return (
  //     fetch("${this.baseUrl}/auth/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(body)
  //     })
  //     .then((response) => {
  //       if (!response.ok) {
  //         // console.log("Error")
  //         throw Error(response.statusText)
  //       }
  //       // console.log("Success")
  //       return response.json()
  //     })
  //   )
  // }

  // LOGIN FOR JWT
  // static Login(object) {
  //   return (
  //     fetch(`${this.baseUrl}/login/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // body: JSON.stringify({'username': 'superbin1996', 'password': 'django.bin@28896d'}),
  //       body: object,
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json()
  //     })
  //   )
  // }
const LIST_AGENTS = (page: number = 1, search: string = ""): string => `
    query {
  listAgentsBeta(
    request: {
      page: ${page},               # Page number for pagination
      s: "${search}",              # Search term
      orderBy: "createdDate" # Ordering the results by createdDate
    }
  ) {
    items {
      id
      agentName
      description
      system
      createdDate
    }
    hasMore
    page
  }
}`;

const AUTH_LOGIN = (username: string, password: string): string => `
mutation {
    login(email:"${username}",password:"${password}"){
        message
        error
    }
}
`;

const REFRESH_TOKEN = () => `mutation {
  refreshToken {
   message
   error
  }
}`;

function AUTH_SIGNUP(data: {
  fname: string;
  lname: string;
  code: string;
  phone: string;
  email: string;
  password: string;
}) {
  return `
    mutation {
      signup(user: {
        fname: "${data.fname}"
        lname: "${data.lname}"
        code: "${data.code}"
        phone: "${data.phone}"
        email: "${data.email}"
        password: "${data.password}"
        role: "user"
      }) {
        id
        fname
        lname
        code
        phone
        email
        role
      }
    }
  `;
}

export { LIST_AGENTS, AUTH_LOGIN, REFRESH_TOKEN, AUTH_SIGNUP };

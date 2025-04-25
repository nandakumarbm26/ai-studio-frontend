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
export { LIST_AGENTS, AUTH_LOGIN };

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
let bearerToken
let baseUrl = 'https://api.spotify.com/v1'
let user = Cypress.env('userId')
let clientId= Cypress.env('clientId')
let redirectUri = 'http://localhost:3000'
let username = Cypress.env('username')
let password = Cypress.env('password')

Cypress.Commands.add('connect', ()=>{
    let user = Cypress.env("userId")
    //cy.visit('http://localhost:3000/')
    cy.visit(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`)
    cy.intercept('GET', 'https://api.spotify.com/v1/me', (req)=>{
        expect(req.headers).to.have.property('authorization')
        bearerToken = req.headers.authorization
        console.log(bearerToken)
        req.reply((res)=>{
            expect(res.body).to.have.property('display_name', 'Wouter')
            expect(res.body).to.have.property('id', user)
        })        
    })
    cy.get("#login-username").type(username)
    cy.get("#login-password").type(password)
    cy.get('.control-indicator').click()
    cy.get("#login-button").click()
    cy.get(".details").contains('Wouter')
    cy.get("#auth-accept").click()
})

Cypress.Commands.add('getDetails', ()=>{
    cy.request({
        method: "GET",
        url:`${baseUrl}/users/${user}/playlists`,
        headers:{
            authorization: `${bearerToken}`,
            client_id:`${clientId}`
        }

    })
})

Cypress.Commands.add('login', ()=>{
    cy.visit('https://www.spotify.com/nl/')
        cy.get('a[href^="/login/"]').click()
        cy.get("#login-username").clear().type(username)
        cy.get("#login-password").type(password)
        cy.get('.control-indicator').click()
        cy.get("#login-button").click()
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

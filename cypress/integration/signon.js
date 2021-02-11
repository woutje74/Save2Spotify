/// <reference types="cypress" />

describe('Visit Spotify login page and log in', () => {
    let clientId = Cypress.env("clientId")
    let redirectUri = 'http://localhost:3000'
    let username = Cypress.env('username')
    let password = Cypress.env('password')
    let token
    
    it('Go to Spotify log in page', () =>{
        //cy.visit('http://localhost:3000')
        cy.visit(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`)
        cy.get("#login-username").type(username)
        cy.get("#login-password").type(password)
        cy.get('.control-indicator').click()
        cy.get("#login-button").click()
        cy.get(".details").contains('Wouter')
        cy.get("#auth-accept").click()
    })
})


/// <reference types="cypress" />

describe('Work with playlists', () =>{
    let playlist = Math.random().toString(36)
    let totalPlaylists

    it('Get authorization', ()=>{
        cy.connect()
        cy.get('.ConnectButton').click().contains('Wouter')
    })

    it('Get playlists', () =>{
        cy.getDetails().then(response=>{
            expect(response.status).to.eq(200)
            let body = JSON.parse(JSON.stringify(response.body))
            totalPlaylists = body.total
            cy.log('Total number of playlists for this user is: '+totalPlaylists)
        })
    })

    it('Create playlist', () =>{ 
        //cy.visit('http://localhost:3000')
        cy.getDetails()
        cy.get('#searchField').type('Madonna')
        cy.get('.SearchButton').click()
        cy.get('.Track-action').click({multiple: true})
        cy.get('input[value="New Playlist"]').clear().type(playlist)
        cy.get('.Playlist-save').click()
        cy.get('.Playlist > .TrackList > :nth-child(1) > .Track > .Track-action').contains('-')
        cy.get('.PlaylistResults > h2').click().then(()=>{
            totalPlaylists++
            cy.log('The total number of playlists is now: '+totalPlaylists)
            cy.wait(5000)
            cy.getDetails().then(response=>{
                expect(response.status).to.eq(200)
                let body = JSON.parse(JSON.stringify(response.body))
                expect(totalPlaylists).to.eq(body.total)
            })
        }) 
    })

    it('Retrieve specific playlist', ()=>{
        cy.getDetails()
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.ConnectButton').click();
        cy.wait(2000)
        cy.get('.PlaylistResults > h2').click();
        cy.get('.PlaylistItem:nth-child(1)').contains(playlist)
        cy.get(':nth-child(1) > .PlaylistItem > .PlaylistItem-information > h3').click();
        /* ==== End Cypress Studio ==== */
    })
})

describe('Remove authorization', ()=>{
    it('Log into Spotify account', ()=>{
        cy.login()
        cy.wait(6000)
        cy.get('a[href="/nl/account/apps/"]').click()
        cy.get('button[type="submit"]').click()
        cy.get('.alert').should('have.class', 'alert-success')
        cy.get('button[aria-controls="profileMenu"]').click()
        cy.get('a[href$="/logout/"]').click()
        cy.get('a[href^="/login/"]').contains('Inloggen')


    })
})
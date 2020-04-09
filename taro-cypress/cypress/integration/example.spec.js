describe('First Case', () => {
  it('Visit Home Page', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        win.fetch = null;
      }
    })
  })
})

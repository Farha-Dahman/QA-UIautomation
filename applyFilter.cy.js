describe('login page' , ()=>{
    beforeEach( () => {
        // logIn and module test 
        cy.visit('https://goal-dev.mdx.ac.uk/accounts/login/?next=/');
        cy.get('#id_username').type('Ayas') ; 
        cy.get('#id_password').type('Ayas123#');
        cy.get('select[name="login_as"]').select('staff');
        cy.get('form[action="/login/"] > button[type="submit"]').click();
        cy.get('h2').should('exist').contains('My modules'); 
        cy.get('div.list-group-item').should('exist'); 
        cy.get('h6').should('exist').contains('GroupR/Nablus: Course GroupR');
        cy.visit('https://goal-dev.mdx.ac.uk/staff/35/goals/');
    } ); 

     // TC-01 Check all items in goal list abear and exist 
   it('Goal Filter list', ()=>{
       cy.get('h5.panel-title > strong').contains('Goal Filter');
       
       cy.get('#all_goals').should('exist').should('not.be.checked');
        cy.get('label[for="all_goals"]').should('exist');
       
        cy.get('label.custom-control-label > h5').contains('Topic1');
        cy.get('#topic_77').should('exist').should('not.be.checked'); 
       
        cy.get('label.custom-control-label').contains('Sub1');
        cy.get('#goal_1409').should('exist').should('not.be.checked'); 
    }); 
    //TC-02  Check all items in Group list abear and exist 
   it('Group filter list' , () => {
    cy.get('h5.panel-title > strong').contains('Group filter');
    
    cy.get('#all_groups').should('exist').should('not.be.checked');
    cy.get('label[for="all_groups"]').should('exist');
    
    cy.get('#group_None').should('exist').should('not.be.checked'); 
    cy.get('label[for="group_None"]').should('exist');
    
    cy.get('#group_Group1').should('exist');
    cy.get('label[for="group_Group1"]').should('exist');

   }) 

   // TC-03 Check all items in Livel list abear and exist 
   it('Livel filter list' , () => {
    cy.get('h5.panel-title > strong').contains('Level filters');
    
    cy.get('#all_levels').should('exist').should('be.checked');
    cy.get('label[for="all_levels"]').should('exist');
    
    cy.get('#level_Low').should('exist').should('be.checked'); 
    cy.get('label[for="level_Low"]').should('exist');
    
    cy.get('#level_Medium').should('exist').should('be.checked'); 
    cy.get('label[for="level_Medium"]').should('exist');

    cy.get('#level_High').should('exist').should('be.checked'); 
    cy.get('label[for="level_High"]').should('exist');
   }) 


   //TC-04 check Other filter list 
   it(' Other filters' , ()=> {
    cy.get('h5.panel-title > strong').contains('Other filters');
    
    cy.get('#not_observed').should('exist').should('be.checked');
    cy.get('label[for="not_observed"]').should('exist');

    cy.get('#expected_ByNow').should('exist').should('not.be.checked'); 
    cy.get('label[for="expected_ByNow"]').should('exist');
   })

   //TC-05 check filter with choice sub1 , group1 and low levil withot choice any thing from Other filters ..          
   it('Filter with sub1, group1 and low levil ', ()=> {
    // test if lable contains Sub1 as a text 
    cy.get('label.custom-control-label').contains('Sub1');
    //  make check box for sub1 
    cy.get('#goal_1409').check({force : true});
    // test if lable contains Group1 as a text 
    cy.get('#group_Group1').should('exist');
     //  make check box for Group1 
    cy.get('#group_Group1').check({force : true});
    // test if lable contains evel_Low as a text
    cy.get('#level_Low').should('exist').should('be.checked'); 
     //  make check box for level_Low 
    cy.get('#level_Low').check({force : true});
    // make not_observed is not checked 
    cy.get('#not_observed').uncheck({force : true});
    // click on Apply filters button 
    cy.get('button[type="button"]').contains('Apply filters').should('exist').click();

    cy.get('li.list-group-item').should('exist');
    // test if lable contains Goal details as a text
    cy.get('strong').contains('Goal details').should('exist');
    // test if lable contains Group details as a text
    cy.get('strong').contains('Group').should('exist');
    // test if lable contains Student details as a text
    cy.get('strong').contains('Student').should('exist');
    cy.get('label[for="check1409"] > strong').should('exist').contains('Sub1');
    cy.get('label[for="check1409"] > small > strong').should('exist').contains('Topic1');
    cy.get('label[for="check1409_Group1"]').contains('Group1').should('exist');
    cy.get('strong[for="check1409_Group1_Farha"]').should('exist');
    // test if Unobserve button exist 
    cy.get('button[type="button"]').contains('Unobserve').should('exist');
    // test if observe button exist 
    cy.get('button[type="button"]').contains('Observe').should('exist');
    // test grade list if exist 
    cy.get('.container > .align-items-center.row > .col-sm-2 > select[name="grade"]').should('exist').find('option').should(($option) => {
        expect($option).to.have.length(12);
        expect($option.eq(0)).to.have.value('Grade');
        expect($option.eq(1)).to.have.value('0');
        expect($option.eq(2)).to.have.value('1');
        expect($option.eq(3)).to.have.value('2');
        expect($option.eq(4)).to.have.value('3');
        expect($option.eq(5)).to.have.value('4');
        expect($option.eq(6)).to.have.value('5');
        expect($option.eq(7)).to.have.value('6');
        expect($option.eq(8)).to.have.value('7');
        expect($option.eq(9)).to.have.value('8');
        expect($option.eq(10)).to.have.value('9');
        expect($option.eq(11)).to.have.value('10');    
    });
    // click on Observe button 
    cy.get('button[type="button"]').contains('Observe').should('exist').click();
    // test if Undo button exist after make observe 
   cy.get('button[type="button"]').contains('Undo').should('exist');
    })

    // TC-07 check filter with sub1, group1, low levil and Not observe
    it('Filter with sub1, group1, low levil and Not observe', ()=>{
        // test if lable contains Sub1 as a text 
        cy.get('label.custom-control-label').contains('Sub1');
        //  make check box for sub1 
        cy.get('#goal_1409').check({force : true});    
        cy.get('#group_Group1').should('exist');
        //  make check box for Group1 
        cy.get('#group_Group1').check({force : true});
        //  make check box for all_levels 
        cy.get('#all_levels').uncheck({force : true});
        cy.get('#level_Low').check({force : true});
        cy.get('button[type="button"]').contains('Apply filters').should('exist').click();
        // test id image is abeare after Apply filters clicked 
        cy.get('center > img').should('exist');
        // test if Unobserve button exist 
        cy.get('button[type="button"]').contains('Unobserve').should('exist');
        // test if observe button exist 
        cy.get('button[type="button"]').contains('Observe').should('exist');
      // test grade list if exist 
        cy.get('.container > .align-items-center.row > .col-sm-2 > select[name="grade"]').should('exist').find('option').should(($option) => {
        expect($option).to.have.length(12);
        expect($option.eq(0)).to.have.value('Grade');
        expect($option.eq(1)).to.have.value('0');
        expect($option.eq(2)).to.have.value('1');
        expect($option.eq(3)).to.have.value('2');
        expect($option.eq(4)).to.have.value('3');
        expect($option.eq(5)).to.have.value('4');
        expect($option.eq(6)).to.have.value('5');
        expect($option.eq(7)).to.have.value('6');
        expect($option.eq(8)).to.have.value('7');
        expect($option.eq(9)).to.have.value('8');
        expect($option.eq(10)).to.have.value('9');
        expect($option.eq(11)).to.have.value('10');    
    });
    } )
    // TC-08 test Filter with sub1, All group, All levil and Expected by now only  
    it('Filter with sub1, All group, All levil and Expected by now only', ()=>{
        
        cy.get('#goal_1409').check({force : true}); 
        cy.get('#all_groups').check({force : true});
        cy.get('#all_levels').check({force : true});
        // make not_observed check box uncheck 
        cy.get('#not_observed').uncheck({force : true});
        cy.get('#expected_ByNow').check({force : true});
        cy.get('button[type="button"]').contains('Apply filters').should('exist').click();
        cy.get('li.list-group-item').should('exist');
        cy.get('strong').contains('Goal details').should('exist');
        cy.get('strong').contains('Group').should('exist');
        cy.get('strong').contains('Student').should('exist');
        cy.get('label[for="check1409"] > strong').should('exist').contains('Sub1');
        cy.get('label[for="check1409"] > small > strong').should('exist').contains('Topic1');
        cy.get('label[for="check1409_Group1"]').contains('Group1').should('exist');
        cy.get('strong[for="check1409_Group1_Farha"]').should('exist');
        cy.get('button[type="button"]').contains('Undo').should('exist');

        cy.get('label[for="check1409_Group2"]').contains('Group2').should('exist');
        cy.get('strong[for="check1409_Group2_Ayas"]').should('exist');
    })
    // TC-09
        it('Filter without data', (done) => {
          cy.get('button[type="button"]').contains('Apply filters').should('exist').click();

            cy.on ('window:alert', (text) => {
              expect(text).to.eq('Please selet a goal')
              done()                                  
          })
    })
    // TC-10 Filter Sub1 Only
    it('Filter Sub1 Only ', (done) => {
        cy.get('#goal_1409').check({force : true});
        // make check for Apply filters after sub1 checked  
        cy.get('button[type="button"]').contains('Apply filters').should('exist').click();
          cy.on ('window:alert', (text) => {
            // check if data abear in alert equal Please selet a group 
            expect(text).to.eq('Please selet a group')
            done()                                  
        })
  })
  // TC-11 Filter Low level Only
  it('Filter Low level Only ', (done) => {
    cy.get('#level_Low').check({force : true});
    cy.get('button[type="button"]').contains('Apply filters').should('exist').click();
      cy.on ('window:alert', (text) => {
        // check if data abear in alert equal Please selet a goal
        expect(text).to.eq('Please selet a goal')
        done()                                  
    })
})
});

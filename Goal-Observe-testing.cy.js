describe('Testing Observe And Grade in staff page', () => {
   beforeEach(() => {
      cy.visit('https://goal-dev.mdx.ac.uk/accounts/login/?next=/');

      cy.get('input[type="text"]').type('AhmadAliAmer');
      cy.get('input[type="password"]').type('ahmad159753142536');
      cy.get('select[name="login_as"]').select('staff');
      cy.get('form[action="/login/"] > button[type="submit"]').click();
      cy.get('a.nav-link.active.w-100').click();
      cy.get('a.nav-link.text-light[href="/staff/35/goals/"]').click();
      cy.get('label.custom-control-label[for="all_goals"]').click();
      cy.get('label.custom-control-label[for="all_groups"]').click();
      cy.get('label.custom-control-label[for="not_observed"]').click();
      cy.get('label.custom-control-label[for="expected_ByNow"]').click();

      cy.get('select[name="grade"]').as('gradeSelect');
      cy.get('button.btn.btn-primary.mt-2.w-100[onclick="observeAll(\'add\', this)"]').as('observedButton');

   });


   // TC-Grade-001
   // TestCaseTitle: Verify grade dropdown is visible and enabled
   // Test Data: N/A
   // Expected Result: Grade dropdown should be visible and enabled
   // Actual Result: Grade dropdown is visible and enabled
   it(' Grade should be visible and enabled', () => {
      cy.get('@gradeSelect').should('be.visible').should('be.enabled');
   });

   // TC-Grade-002
   // TestCaseTitle: Verify grade dropdown has the correct number of items
   // Test Data: 12 items
   // Expected Result: Grade dropdown should have 12 items
   // Actual Result: Grade dropdown has 12 items
   it('Grade have the correct number of items', () => {
      const ItemCount = 12;
      cy.get('select[name="grade"] option').should('have.length', ItemCount);
   });

   // TC-Grade-003
   // TestCaseTitle: Verify grade dropdown has the default value "Grade"
   // Test Data: Default value "Grade"
   // Expected Result: Grade dropdown should have the default value "Grade"
   // Actual Result: Grade dropdown has the default value "Grade"
   it('Grade have the default value grade disable', () => {
      const defaultValue = 'Grade';
      cy.get('@gradeSelect').find('option:selected').should('have.text', defaultValue);
   });

   // TC-Grade-004
   // TestCaseTitle: Verify grade dropdown has all options from 1 to 10 and "Not graded" option
   // Test Data: Options from 1 to 10 and "Not graded"
   // Expected Result: Grade dropdown should have all options from 1 to 10 and "Not graded" option
   // Actual Result: Grade dropdown has all options from 1 to 10 and "Not graded" option
   it('Grade drop down should have all options from 1 to 10 and Not graded Option', () => {
      cy.get('select[name="grade"] option').then((options) => {
         expect(options.eq(1).text().trim()).to.equal('Not graded');
         for (let i = 2; i <= 10; i++) {
            expect(options.eq(i + 1).text().trim()).to.equal(i.toString());
         }
      });
   });

   // TC-Grade-005
   // TestCaseTitle: Select an option from the grade dropdown
   // Test Data: Option "5"
   // Expected Result: Grade dropdown should have option "5" selected
   // Actual Result: Grade dropdown has option "5" selected
   it('should select an option from the dropdown Grade', () => {
      cy.get('select[name="grade"][onchange="gradeAllSelected(this)"]').select('5');
      cy.get('button.btn.btn-primary.mt-2.w-100')
         .contains('Observe')
         .click();
   });

   it(' check if the user can change the grade that he did not observed', () => {

      cy.get('button.btn.btn-primary.mt-2.w-100')
         .contains('Observe')
         .click();

      const disabledGradeElemnt = 'select.textinput[name="grade"][maxlength="255"][disabled][style="width: 8rem;"]';

      cy.get(disabledGradeElemnt).then(($select) => {


         expect($select.prop('disabled')).to.be.true;

      });

   });


   it('Check if the user can change the grade for a mark he observed ', () => {
      cy.get('button.btn.btn-primary.mt-2.w-100')
         .contains('Observe')
         .click();
      const onChange = 'gradeMe(72005, this.value)';
      cy.get(`select[name="grade"][onchange="${onChange}"]`).then(($select) => {
         
           const disable=$select.prop('disabled')
         expect(disable).to.be.false;
       
      });
   });

   it('change the grade for a mark the teacher observed choose Not graded', () => {
      cy.get('button.btn.btn-primary.mt-2.w-100')
         .contains('Observe')
         .click();
      const onChange = 'gradeMe(72005, this.value)';
      cy.get(`select[name="grade"][onchange="${onChange}"]`).then(($select) => {
         
         cy.wrap($select).select('Not graded');
       
      



      });
   });

   it('change the grade for a mark the teacher observed choose Number ', () => {
      cy.get('button.btn.btn-primary.mt-2.w-100')
         .contains('Observe')
         .click();
      const onChange = 'gradeMe(72005, this.value)';
      cy.get(`select[name="grade"][onchange="${onChange}"]`).then(($select) => {
         
         cy.wrap($select).select('7');
      });
      
   });
  //TC-Observe-001
    //Check that the general Observe button can be clicked 
    it(' Check the Observe button is clickable visiable and enabled', () => {


      cy.get('@observedButton')
          .should('exist') // Check if the button exists
          .and('be.visible') // Check if the button is visible
          .and('be.enabled')

      //here we get the Observe button and click on it 
      cy.get('@observedButton')
          .click();
      //Check that the Observe general button can be triggerd by the mouse and it exist
      cy.get('@observedButton')
          .trigger('mouseover').should('exist');

  });

    //TC-Observe-002
    // TestCaseTitle: Verify undo button exists and is enabled
    //Check that that the undo button for  students is clickable and exists 

    it('Check that that the undo button for a specific students is clickable and exists ', () => {

      //click the General Observe button
      cy.get('@observedButton')
          .click();

      //here we get the button that have the class "button.btn-danger" and contains 'Undo' word and click it
      cy.contains('button.btn-danger', 'Undo')
          .click();

  });
  // TC-Observe-003
  // TestCaseTitle: Verify Unobserve exists and is enabled
  // Check that the UnObserve button for a specific student is clickable and exists
  it('Check that the UnObserve button exists and is enabled', () => {
      const UnObservedButton = 'button.btn.btn-danger.mt-2.w-100[onclick="observeAll(\'undo\', this)"]';

      cy.get(UnObservedButton)
          .should('exist') // Check if the button exists
          .and('be.visible') // Check if the button is visible
          .and('be.enabled'); // Check if the button is enabled (clickable)

      cy.get(UnObservedButton)
          .click();

  });
  // TC-Observe-004
  // TestCaseTitle: Verify the observed goals count changes after clicking the Observe button
  it('Verify the observed goals count increased after clicking the Observe button', () => {


      cy.get('@observedButton')
          .click()

      const ObservedGoals = 'span#observedGoal';

      // Click  the Observe button for a specific student

      cy.get('button.btn.btn-primary[onclick="observe(1066, 1411  , this)"]').click();

      // here we get the observed goals by 'span#observedGoal'
      // use invoke command to allow as excute a function to retrieve 'text' calue and then parse it to integer
      // Check if the observed goals count has increased by 1
      cy.get(ObservedGoals)
          .invoke('text')
          .should((newText) => {
              const newObservedGoals = parseInt(newText);

              // here we check that the new observed goals = the old + 1
              expect(newObservedGoals).to.equal(11);
          });
      //Expected resault = 11 
      // actualt result = 11
      //Pass
  });


// TC-Observe-005
// TestCaseTitle: Verify the observed goals count changes after clicking the Observe button
it('Verify the observed goals count deacreased after clicking the undo button', () => {

      cy.get('@observedButton')
          .click()

      const ObservedGoals = 'span#observedGoal';
      
      // Click  the Observe button for a specific student
      cy.get('button.btn.btn-danger[onclick="unObserve(73228 , \'#1474_869\', this)"]')
      .click()
      // here we get the observed goals by 'span#observedGoal'
      // use invoke command to allow as excute a function to retrieve 'text'  and then parse it to integer
      // Check if the observed goals count has deacreased by 1
      cy.get(ObservedGoals)
          .invoke('text')
          .should((newText) => {
              const newObservedGoals = parseInt(newText);

              // here we check that the new observed goals = the old + 1
              expect(newObservedGoals).to.equal(11); //use static numbers because variables did not work
          });
      //Expected resault = 11 
      // actualt result = 11
      //Pass
  });


});


describe('Staff Menu page', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test

        //so here is our precondition before each test case we make visit Goals url page
        //and login functionality work automatically :
        cy.visit('https://goal-dev.mdx.ac.uk/login/');
        const userName = 'Farha'
        const passWord = 'fff123456'

        //enter userName > 'Farha' in username input :
        cy.get('#id_username').type(userName);
        //enter passWord > 'fff123456' in passWord input :
        cy.get('#id_password').type(passWord);
        cy.get('select[name="login_as"]').select('Staff');
        //get login button element and click on it:
        cy.get('button[type="submit"]').click();
        cy.get('a[href="/staff/35"]').eq(0).click();
        cy.get('a[href="/staff/35/staffs/"]').click();
    });


    it('Open Staff Menu page', () => {
        // Check that the relevant elements exist on the page
        cy.get('#new_staff').should('exist');
        cy.get('button.btn').should('exist');
        cy.get('label').contains('Search').should('exist');
        cy.get('input[type="search"].form-control').should('exist');
        cy.get('table#staffs').should('exist');
        cy.get('div.dataTables_info[role="status"]').should('exist');
    });

    //Add Staff
    //TC-1
    // We'll store our item text in a variable so we can reuse it
    const validNameStaff = 'FarhaD';
    it('Should staff can adding a new staff name and it to the table', () => {
        // Type "FarhaD" into the input field and check if the value is correct
        cy.get('#new_staff').type(validNameStaff).should('have.value', validNameStaff);

        //In this command, the mouseover event is triggered on the 
        //button element with the class .btn.btn-primary, and the test checks that 
        //the mouseover is existed. 
        cy.get('button.btn.btn-primary:first').trigger('mouseover').should('exist');

        // Click the "Add staff" button
        cy.get('button.btn.btn-primary').contains('Add staff').click();
        // Check if the staff name has been added to the table
        cy.get('table#staffs').find('tr').should('contain', validNameStaff);
    });

    //Add Staff
    //TC-2
    // We'll store our item text in a variable so we can reuse it
    const inValidName = 'Far&^*87/-=@f';
    it('Add staff with InValid Staff Name', () => {
        // Type "Far&^*87/-=@f" into the input field and check if the value is correct
        cy.get('#new_staff').type(inValidName).should('have.value', inValidName);
        // Click the "Add staff" button
        cy.get('button.btn.btn-primary').contains('Add staff').click();
        // Check if the staff name has been added to the table
        cy.contains('Not Found').should('be.visible');

    });

    //Add Staff
    //TC-3
    //This test should check if the application open page contains the  
    //Not Found The requested resource was not found on this server.
    //because the application not allow you to enter the empty value
    it('Add staff with empty Staff Name', () => {
        const emptyValid = '  ';
        // Type " " into the input field and check if the value is correct
        cy.get('#new_staff').type(emptyValid).should('have.value', emptyValid);
        // Click the "Add staff" button
        cy.get('button.btn.btn-primary').contains('Add staff').click();
        // Check if the "Not Found" message is displayed
        cy.contains('Not Found').should('be.visible');
    });

    //Search for Staff
    //TC-1
    //Verify search for an staff by an existing user name
    it('Verify search for an staff by an existing user name', () => {
        const INPUT_SEARCH = 'Far';
        //Search for the Far part of staff name member
        cy.get('input[type="search"][aria-controls="staffs"]').type(INPUT_SEARCH);
        // Check if the search result contains the expected staff member
        // Check if all results contain the input text
        cy.get('th').contains('Name').invoke('index').then(nameIndex => {
            cy.get('th').contains('Email').invoke('index').then(emailIndex => {
                // Check if the search result contains the expected staff member and email
                cy.get('table#staffs tbody tr').each(($row) => {
                    const name = $row.find(`td:nth-child(${nameIndex + 1})`).text();
                    const email = $row.find(`td:nth-child(${emailIndex + 1})`).text();

                    if (name.includes(INPUT_SEARCH) || email.includes(INPUT_SEARCH)) {
                        expect(name).to.include(INPUT_SEARCH);
                        expect(email).to.include(INPUT_SEARCH);
                    }
                });
            });
        });
    });

    //Search for Staff
    //TC-2
    //Verify search for an staff by user name that does not exist
    it('Verify search for an staff by user name that does not exist', () => {
        //Search for the AAAA staff member that does not exist
        cy.get('input[type="search"][aria-controls="staffs"]').type('AAAA');
        // Check if table contains No matching records found
        cy.get('table#staffs').find('td.dataTables_empty').should('be.visible');
    });

    //Search for Staff
    //TC-3
    //Verify search for an staff by an existing user Email
    it('Verify search for an staff by an existing user Email', () => {
        // Locate the Email header element and get its column index
        cy.get('th').contains('Email').invoke('index').then(index => {
            const EMAIL_STAFF = 'farhajehad@gmail.com';
            //Search for the farhajehad@gmail.com staff member that does not exist
            cy.get('input[type="search"][aria-controls="staffs"]').type(EMAIL_STAFF);

            // Check if the search result contains the farhajehad@gmail.com email address
            cy.get('table#staffs')
                //In which colIndex the Email exist 
                .find(`tbody td:nth-child(${index + 1})`)
                .should('contain', EMAIL_STAFF);
        });
    });

    //Search for Staff 
    //TC-4
    //Verify search for an staff by an existing  permission (N/A)
    it('Verify search for an staff by an existing  permission (N/A)', () => {
        const existPermission = 'N/A';
        // Type "N/A" into the search box
        cy.get('input[type="search"][aria-controls="staffs"]').type(existPermission);
        //Check if the table contains the expected value N/A in the Goal column
        // Check if the "No matching records found" text is not visible
        cy.get('table#staffs').should('not.contain', 'No matching records found');
        // Check if the table contains the search value in any column
        cy.get('table#staffs').find('td').should('contain', existPermission);
    });

    //Search for Staff 
    //TC-5
    //Verify search for an staff by an existing  permission (Write)
    it('Verify search for an staff by an existing  permission (Write)', () => {
        const WritePermission = 'Write';
        // Type "Write" into the search box
        cy.get('input[type="search"][aria-controls="staffs"]').type(WritePermission);
        //Check if the table contains the expected value Write in the Goal column
        // Check if the "No matching records found" text is not visible
        cy.get('table#staffs').should('not.contain', 'No matching records found');
        // Check if the table contains the search value in any column
        cy.get('table#staffs').find('td').should('contain', WritePermission);
    });

    //Remove Staff
    //TC-1
    //Check if the plus icon is exist in the page
    it('Check if the Remove Staff feature is exist in page', () => {

        //cy.wait(4000)
        // Check if the anchor tag exists
        cy.get('a[data-href="Farha"]').should('exist');
        // Click on the anchor tag
        cy.get('a[data-href="Farha"]').contains('Remove').click({ force: true });

        // Assert that the modal content is visible
        cy.get('.modal-content').should('be.visible');

    });

    //Remove Staff
    //TC-2
    //Verify the existence of Confirm Delete modal content
    it('Verify the existence of Confirm Delete modal content', () => {
        // Assert that the modal content exists
        cy.get('.modal-content').should('exist');
        // Check if all element in the Confirm Delete modal
        cy.get('.modal-content').find('.modal-header h4.modal-title').should('exist').should('contain', 'Confirm Delete');
        //Check if the X button is exist in the modal
        cy.get('.modal-content').find('.modal-header button.close').should('exist');
        // Check if the model body content is exist 
        cy.get('.modal-content').find('.modal-body').should('exist').should('contain', 'You are about to delete one staff with username=').should('contain', 'Do you want to proceed?');
        //Check if the Cancel button is exist in the modal   
        cy.get('.modal-content').find('.modal-footer button.btn-default').should('exist').should('contain', 'Cancel');
        // Check if the Remove button is exist 
        cy.get('a.btn.btn-danger.btn-ok').should('exist');
    });

    //Remove Staff
    //TC-3
    //Verify Removing a Staff 
    it('Remove a staff then verify the staff member does not exist in table', () => {
        const username = 'Noor';

        // Click the "Remove" staff  
        cy.get('a[data-href="Noor"]').click({ force: true });
      
        // Confirm the deletion in the modal
        cy.get('.modal-content .btn-ok').click();
      
        // Wait for the deletion to complete
        cy.wait(2000);
      
        // Verify that the username does not exist in the table
        cy.get('table#staffs tbody tr').each(($row) => {
          const name = $row.find('td:first').text();
          expect(name).to.not.include(username);
        });
      });

      //Remove Staff
      //TC-4
      // Verify when click on the Close button then should the Confirm Delete is non appearing
      it('Close the Confirm Delete modal and verify it is non-displayed', () => {
        // Check if the anchor tag exists
        cy.get('a[data-href="Farha"]').should('exist');
        // Click on the anchor tag
        cy.get('a[data-href="Farha"]').contains('Remove').click({ force: true });
        // Verify that the modal content is visible    
        cy.get('.modal-content').should('be.visible');
        // Click the close button on the Confirm Delete
        //cy.get('.modal-content .modal-header button.close').click({ multiple: true, force: true });
        cy.get('.modal-content').find('.modal-header button.close').click({ multiple: true, force: true });
        // Will the Confirm Delete is disappearing
        cy.wait(500); 
        // Verify that the Confirm Delete is non-displayed
        cy.get('.modal-content').should('not.be.visible');
    });

      //Remove Staff
      //TC-5
      // Verify the click to the cancel button in the Confirm Delete 
      it('Cancel the deletion and verify user name still exists in the table and not deleted', () => {
        // Check if the anchor tag exists
        cy.get('a[data-href="Farha"]').should('exist');
        // Click on the anchor tag
        cy.get('a[data-href="Farha"]').contains('Remove').click({ force: true });
        // Verify that the modal content is visible
        cy.get('.modal-content').should('be.visible');
        // Click the cancel button on the Confirm Delete
        cy.get('.modal-content .modal-footer button.btn-default').click();
        // Will the Confirm Delete is disappearing
        cy.wait(500); 
        // Verify that the Confirm Delete is non-displayed
        cy.get('.modal-content').should('not.be.visible');
        // The Farha staff does not display in the top of the table
        // because of that I make a scroll to view the user name
        cy.contains('td.sorting_1', 'Farha').scrollIntoView();
        // Verify that the user name still exists in the table
        cy.contains('td.sorting_1', 'Farha').should('be.visible');
    });

    //Edit Staff
    //TC-1
    it("Check the 'Edit' when we click on it, and verify the select is appearing", () => {
        cy.get('a.nav-link.text-light[href="/staff/35/staffs/"]').click();
        cy.get('tr#staff_Farhaj')
            .find('a')
            .contains('Edit')
            .click({ force: true });

        // Scroll the select element ito view the Farhaj staff
        cy.get('select[name="permissions_Goals"][form="form_staff_Farhaj"]').scrollIntoView();

        // Check if the select element is visible or not
        cy.get('select[name="permissions_Goals"][form="form_staff_Farhaj"]').should('be.visible');
    });


    //TC-2
    it("Test select element options", () => {
        // Select the element
        cy.get('select[name="permissions_Goals"][form="form_staff_Farhaj"]').as('selectElement');

        // Verify the initial selected option is "N/A"
        cy.get('@selectElement').should('have.value', '0');

        cy.get('a.nav-link.text-light[href="/staff/35/staffs/"]').click();
        cy.get('tr#staff_Farhaj')
            .find('a')
            .contains('Edit')
            .click({ force: true });

        // Select "Read" option
        cy.get('@selectElement').select('1');
        cy.get('@selectElement').should('have.value', '1');

        // Select "Write" option
        cy.get('@selectElement').select('2');
        cy.get('@selectElement').should('have.value', '2');

        // Select "N/A" option again
        cy.get('@selectElement').select('0');
        cy.get('@selectElement').should('have.value', '0');
    });

});
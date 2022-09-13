describe('initial page landing', () => {
  beforeEach(function () {
    cy.resetDbAddUser({
      username: 'root',
      name: 'Test User',
      password: 'password',
    });
    cy.visit('http://localhost:3000');
  });

  it('homepage can be opened', () => {
    cy.contains('Blogs');
  });

  it('login form is shown by default', function () {
    cy.contains('username').should('be.visible');
    cy.contains('password').should('be.visible');
  });

  it('login form can be hidden/closed', function () {
    cy.contains('username').should('be.visible');
    cy.contains('password').should('be.visible');
    cy.contains('Login').should('be.visible');
    cy.get('#login_cancel_btn').click();
    cy.contains('username').should('not.be.visible');
    cy.contains('password').should('not.be.visible');
    cy.contains('Login').should('not.be.visible');
  });
});

describe('Login', function () {
  beforeEach(function () {
    cy.resetDbAddUser({
      username: 'root',
      name: 'Test User',
      password: 'password',
    });
    cy.visit('http://localhost:3000');
  });

  it('login form can be closed after opening it', function () {
    cy.contains('username').should('be.visible');
    cy.contains('password').should('be.visible');
    cy.get('#login_cancel_btn').click();
    cy.contains('username').should('not.be.visible');
    cy.contains('password').should('not.be.visible');
    cy.get('#login_cancel_btn').click();
    cy.contains('username').should('be.visible');
    cy.contains('password').should('be.visible');
  });

  it('user can login and logout', function () {
    cy.get('#username').type('root');
    cy.get('#password').type('password');
    cy.get('[data-cy=login_btn]').click();
    cy.contains('Test User is logged in').should(
      'be.visible'
    );
    cy.get('[data-cy=logout_btn]').click();
  });

  it('fails with wrong credentials and displays red warning box', function () {
    cy.get('#username').type('wrong');
    cy.get('#password').type('credentials');
    cy.get('[data-cy=login_btn]').click();
    cy.contains('Wrong credentials')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('succeeds with correct credentials', function () {
    cy.get('#username').type('root');
    cy.get('#password').type('password');
    cy.get('[data-cy=login_btn]').click();
    cy.contains('Test User is logged in').should(
      'be.visible'
    );
  });

  it('user is able to logout', function () {
    cy.get('#username').type('root');
    cy.get('#password').type('password');
    cy.get('[data-cy=login_btn]').click();
    cy.contains('Test User is logged in').should(
      'be.visible'
    );
    cy.get('[data-cy=logout_btn]').click();
    cy.contains('Test User is logged in').should(
      'not.exist'
    );
  });
});

describe('adding new blogs', function () {
  beforeEach(function () {
    cy.resetDbAddUser({
      username: 'root',
      name: 'Test User',
      password: 'password',
    });
    cy.login({ username: 'root', password: 'password' });
    cy.get('[data-cy=title_input]').as('title');
    cy.get('[data-cy=author_input]').as('author');
    cy.get('[data-cy=blog_url_input]').as('url');

    cy.get('[data-cy=add_blog_btn]').as('add-blog');
  });

  it('can add new blog', function () {
    cy.get('#new_blog_button').click();
    cy.get('@title').type('titled');
    cy.get('@author').type('authored');
    cy.get('@url').type('www.cypress.io');
    cy.get('@add-blog').click();

    cy.contains('titled').should('exist').and('be.visible');
    cy.contains('authored')
      .should('exist')
      .and('be.visible');
    cy.contains('www.cypress.io')
      .should('exist')
      .and('not.be.visible');
  });

  it('closes the blog form', function () {
    cy.get('#new_blog_button').click();
    cy.get('@title').as('title').type('titled');
    cy.get('@author').as('author').type('authored');
    cy.get('@url').type('www.cypress.io');
    cy.get('@add-blog').click();

    cy.get('@title').should('not.be.visible');
    cy.get('@author').should('not.be.visible');
    cy.get('@url').should('not.be.visible');
    cy.get('#new_blog_button').should('be.visible');
  });

  it('displays green success message', function () {
    cy.get('#new_blog_button').click();
    cy.get('@title').as('title').type('titled');
    cy.get('@author').as('author').type('authored');
    cy.get('@url').type('www.cypress.io');
    cy.get('@add-blog').click();

    cy.get('.successMsg')
      .contains('added')
      .should('exist')
      .and('be.visible');
  });

  it('success message should contain title and author', function () {
    cy.get('#new_blog_button').click();
    cy.get('@title').as('title').type('titled');
    cy.get('@author').as('author').type('authored');
    cy.get('@url').type('www.cypress.io');
    cy.get('@add-blog').click();

    cy.get('.successMsg')
      .contains('A new blog titled by authored added')
      .should('exist')
      .and('be.visible');
  });

  it('adding a blog automatically adds user who created it', function () {
    cy.get('#new_blog_button').click();
    cy.get('@title').type('titled');
    cy.get('@author').type('authored');
    cy.get('@url').type('www.cypress.io');
    cy.get('@add-blog').click();
    cy.get('hide_show_button').click();
    cy.contains('Test User')
      .should('exist')
      .and('be.visible');
  });

  it('adding a new blog only displays title, author, and show button by default', function () {
    cy.get('#new_blog_button').click();
    cy.get('@title').type('titled');
    cy.get('@author').type('authored');
    cy.get('@url').type('www.cypress.io');
    cy.get('@add-blog').click();

    cy.contains('Show').should('exist').and('be.visible');
    cy.contains('titled').should('exist').and('be.visible');
    cy.contains('authored')
      .should('exist')
      .and('be.visible');
  });
});

describe('dealing with one note', function () {
  beforeEach(function () {
    cy.resetDbAddUser({
      username: 'root',
      name: 'Test User',
      password: 'password',
    });
    cy.login({ username: 'root', password: 'password' });
    cy.addBlog({
      title: 'test blog',
      author: 'test author',
      url: 'www.cypress.io',
    });
  });

  it('show button changes to hide after clicking it', function () {
    cy.contains('Show').click();
    cy.contains('Hide').should('be.visible');
    cy.contains('Show').should('not.exist');
  });

  it('can view url, likes, and username after clicking show button', function () {
    cy.contains('Show').click();

    cy.contains('www.cypress.io')
      .should('exist')
      .and('be.visible');
    cy.contains('Likes').should('exist').and('be.visible');
    cy.contains('Test User')
      .should('exist')
      .and('be.visible');
  });

  it('can hide url, likes and username after clicking hide', function () {
    cy.contains('Show').click();

    cy.contains('www.cypress.io')
      .should('exist')
      .and('be.visible');
    cy.contains('Likes').should('exist').and('be.visible');
    cy.contains('Test User')
      .should('exist')
      .and('be.visible');

    cy.contains('Show').should('not.exist');
    cy.contains('Hide').click();
    cy.contains('www.cypress.io')
      .should('exist')
      .and('not.be.visible');
    cy.contains('Likes')
      .should('exist')
      .and('not.be.visible');
    cy.get('#blog_creator_username')
      .should('exist')
      .and('not.be.visible');
  });

  it('can add likes to blog post', function () {
    cy.contains('Show').click();
    cy.contains(0).should('be.visible');
    cy.get('[data-cy=like-btn]').click();
    cy.contains(1).should('be.visible');
    cy.get('[data-cy=like-btn]').click();
    cy.contains(2).should('be.visible');
    cy.get('[data-cy=like-btn]').click();
    cy.contains(3).should('be.visible');
  });

  it('able to see remove button', function () {
    cy.contains('Show').click();
    cy.contains('Remove').should('be.visible');
  });

  it('able to delete a note', function () {
    cy.contains('Show').click();
    cy.contains('Remove').click();
    cy.contains('test blog').should('not.to.exist');
    cy.contains('test author').should('not.to.exist');
  });
});

describe('dealing with multiple notes', function () {
  beforeEach(function () {
    cy.resetDbAddUser({
      username: 'root',
      name: 'Test User',
      password: 'password',
    });
    cy.login({ username: 'root', password: 'password' });
    cy.addBlog({
      title: 'test blog one',
      author: 'test author one',
      url: 'www.testBlogOne.com',
      likes: 3,
    });
    cy.addBlog({
      title: 'test blog two',
      author: 'test author two',
      url: 'www.testBlogTwo.com',
    });
    cy.addBlog({
      title: 'test blog three',
      author: 'test author three',
      url: 'www.testBlogThree.com',
      likes: 5,
    });
  });

  it('able to see three notes', function () {
    cy.contains('test blog one')
      .should('exist')
      .and('be.visible');
    cy.contains('test blog two')
      .should('exist')
      .and('be.visible');
    cy.contains('test blog three')
      .should('exist')
      .and('be.visible');
  });

  it('able to open and see contents of all three blogs', function () {
    cy.contains('test blog one')
      .parent()
      .find('button')
      .as('showBtnOne');
    cy.contains('test blog two')
      .parent()
      .find('button')
      .as('showBtnTwo');
    cy.contains('test blog three')
      .parent()
      .find('button')
      .as('showBtnThree');

    cy.contains('www.testBlogOne.com').should(
      'not.be.visible'
    );
    cy.contains('www.testBlogTwo.com').should(
      'not.be.visible'
    );
    cy.contains('www.testBlogThree.com').should(
      'not.be.visible'
    );

    cy.get('@showBtnOne').click();
    cy.get('@showBtnTwo').click();
    cy.get('@showBtnThree').click();

    cy.contains('www.testBlogOne.com').should('be.visible');
    cy.contains('www.testBlogTwo.com').should('be.visible');
    cy.contains('www.testBlogThree.com').should(
      'be.visible'
    );
  });

  it('able to open and see contents of second blog', function () {
    cy.contains('test blog two')
      .parent()
      .find('button')
      .as('showButton');
    cy.get('@showButton').click();

    cy.contains('www.testBlogTwo.com').should('be.visible');
  });

  it('blogs are in order of most to least likes', function () {
    cy.get('.blog')
      .eq(0)
      .should('contain', 'test blog three');
    cy.get('.blog')
      .eq(1)
      .should('contain', 'test blog one');
    cy.get('.blog')
      .eq(2)
      .should('contain', 'test blog two');
  });

  it.only('blog order will automatically change after updating likes', function () {
    cy.get('.blog')
      .eq(0)
      .should('contain', 'test blog three');
    cy.get('.blog')
      .eq(1)
      .should('contain', 'test blog one');
    cy.get('.blog')
      .eq(2)
      .should('contain', 'test blog two');

    cy.contains('test blog one')
      .parent()
      .find('button')
      .as('showButton');
    cy.get('@showButton').click();
    cy.get('[data-testid=blog]')
      .eq(1)
      .find('button')
      .eq(1)
      .as('likeButton')
      .click();
    cy.get('.blog')
      .eq(1)
      .as('blogToLike')
      .should('contain', 'test blog one')
      .and('contain', 4);
    cy.get('@likeButton').click();
    cy.get('@blogToLike')
      .should('contain', 'test blog one')
      .and('contain', 5);
    cy.get('@likeButton').click();
    cy.get('@blogToLike')
      .should('contain', 'test blog one')
      .and('contain', 6);
  });
});

// cy.resetDbAddUser({ username: 'root', name: 'Test User', password: 'password' })
// cy.request('POST', 'http://localhost:3003/api/testing/reset')
// const user = {
//   username: 'root',
//   name: 'Test User',
//   password: 'password'
// }

// cy.request('POST', 'http://localhost:3003/api/users', user)
// cy.visit('http://localhost:3000')

// cy.get('[data-cy=hide_show_btn').click({ multiple: true })
// cy.get('[data-cy=remove_btn').click({ multiple: true })
// cy.on('window:alert', t => {
//   expect(t).to.contains('title')
// })
// cy.visit('http://localhost:3000')

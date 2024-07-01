//
// Variables
//








//
// Methods
//

function loadExistingPools() {
    let pools = `<article>
                    <header>
                        <h4 style="margin:0;">Smith Road Oasis</h4>
                    </header>
                    
                    <fieldset role="group">
    
                        <input type="text" name="sharecode-NB9HhT52" value="NB9HhT52" aria-label="Share Code" aria-describedby="sharecode-helper" readonly>
                        <button><i class="fa fa-copy" title="Copy to Clipboard"></i></button>
                        
                    </fieldset>
                    <small id="sharecode-helper">
                        Share this code with neighbors so they can add your pool.
                    </small>
    
                    <form>
                        <button class="pico-background-red-500" type="submit">Delete Pool</button>
                    </form>
                </article>`;

    document.querySelector("#admin-pools").innerHTML = pools;
}

function createNewPool() {

}

function addExistingPool() {

}







// 
// Event listeners
//

document.addEventListener('click', function (event) {

    let adminContent = document.querySelector("#admin-add-pool");

    if (event.target.id == "admin-add-new-pool") {

        let content = `<article>
                <header>
                    <h4 style="margin:0;">New Pool</h4>
                </header>
                <form name="add-new-pool">
                    <input type="text" name="poolname" placeholder="Pool Name" aria-label="Pool Name" aria-describedby="poolname-helper" required />
                    <small id="poolname-helper">
                        The name for your pool (as displayed to neighbors, eg. "Joe's Pool", "Smith Road Oasis", etc...).
                    </small>
                    <input type="email" name="email" placeholder="Email" autocomplete="email" aria-label="Email" aria-describedby="email-helper" required />
                    <small id="email-helper">
                        An email is required to manage your pool in the future. Your email is never sold.
                    </small>
                    <input type="password" name="password" placeholder="Password" aria-label="Password" aria-describedby="password-helper" required />
                    <small id="password-helper">
                        A password is required to manage your pool in the future.
                    </small>
                    <button type="submit">Create New Pool</button>
                </form>
            </article>`

        adminContent.innerHTML = content;
    }

    if (event.target.id == "admin-add-existing-pool") {
        let content = `<article>
                <header>
                    <h4 style="margin:0;">Existing Pool</h4>
                </header>
                <form name="add-existing-pool">
                    <input type="email" name="email" placeholder="Email" autocomplete="email" aria-label="Email" aria-describedby="email-helper" />
                    <small id="email-helper">
                        The email address associated with an existing pool.
                    </small>
                    <input type="password" name="password" placeholder="Password" aria-label="Password" aria-describedby="password-helper" />
                    <small id="password-helper">
                        The pool's password.
                    </small>
                    <button type="submit">Add Existing Pool</button>
                </form>
            </article>`

        adminContent.innerHTML = content;
    }

});

document.addEventListener('submit', function (event) {
    event.preventDefault();

    if (event.target.name="add-new-pool") {
        console.log(event.target);
    }
    
});




///
/// init
/// 

loadExistingPools();
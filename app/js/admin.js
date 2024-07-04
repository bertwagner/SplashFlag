//
// Variables
//








//
// Methods
//

function roundNext15MinuteInterval(date = new Date()) {
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();

    let next_minutes = ((parseInt((currentMinute + 15) / 15) * 15) % 60).toString().padStart(2,'0');
    let next_hours = (currentMinute > 45 ? (currentHour === 23 ? 0 : currentHour + 1) : currentHour).toString().padStart(2,'0');

    return [next_hours, next_minutes];
}

function loadExistingPools() {
    let [next_hours, next_minutes] = roundNext15MinuteInterval(new Date());
    console.log(next_hours,next_minutes)

    let pools = `<article>
                    <header>
                        <h4 style="margin:0;">Smith Road Oasis</h4>
                    </header>
                    <form>
                    <h5>Go Swimming</h5>
                    <fieldset role="group">
                        <input type="time" name="admin-start-time" value="${next_hours}:${next_minutes}" aria-label="Start Time" aria-describedby="start-time-helper">
                        <button style='white-space: nowrap;'>Go Swimming!</button>
                    </fieldset>
                    <small id="start-time-helper">
                        Select a time you are planning on swimming today and notify your pool subscribers.
                    </small>

                    <h5>Share Pool</h5>
                    <fieldset role="group">
                        <input type="text" name="shareurl-NB9HhT52" value="https://splashflag.com/add?id=NB9HhT52" aria-label="Share Pool URL" aria-describedby="shareurl-helper" readonly>
                        <button><i class="fa fa-copy" title="Copy to Clipboard"></i></button>
                    </fieldset>
                    <small id="shareurl-helper">
                        Share this url with neighbors so they can subscribe to your pool.
                    </small>

                    
                    <h5>Delete Pool</h5>
    
                        <button class="pico-background-red-500" type="submit" id="admin-delete-pool">Delete Pool</button>
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
                    <h4 style="margin:0;">Existing Pool(s)</h4>
                </header>
                <form name="add-existing-pool">
                    <input type="email" name="email" placeholder="Email" autocomplete="email" aria-label="Email" aria-describedby="email-helper" />
                    <small id="email-helper">
                        The email address associated with an existing pool.
                    </small>
                    <input type="password" name="password" placeholder="Password" aria-label="Password" aria-describedby="password-helper" />
                    <small id="password-helper">
                        The password used during pool creation.
                    </small>
                    <button type="submit">Add Existing Pool(s)</button>
                </form>
            </article>`

        adminContent.innerHTML = content;
    }

});

document.addEventListener('submit', function (event) {
    event.preventDefault();

    if (event.target.name = "add-new-pool") {
        const data = Object.fromEntries(new FormData(event.target));

        fetch("https://api.splashflag.com/new-pool",
            {
                method: 'post',
                body: JSON.stringify(data)
            }
        ).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Something wen wrong");
        }
        ).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

});




///
/// init
/// 

loadExistingPools();
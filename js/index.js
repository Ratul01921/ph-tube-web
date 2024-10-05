function setTimeString (time){
    const hours = parseInt(time / 3600);
    const remainingMinute = time % 3600;
    const minute = parseInt(remainingMinute / 60);
    const second = remainingMinute % 60;
    return`${hours} hours  ${minute} minute ${second} second ago`
}



// 1 fetch load, and show categories on html

// create load categories 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))

}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
}
const removeActiveBtn = () => {
    const buttons = document.getElementsByClassName('btn-category')

    for(const btn of buttons){
        btn.classList.remove('active')
    }
}

const loadCategoriesVideo = (id) =>{
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) =>{
        removeActiveBtn();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        console.log(activeBtn)
        displayVideos(data.category);
    })
    .catch((error) => console.log(error))
}
const loadDetails = async(videoId) => {
    // console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video)
}

const displayDetails = (video) =>{
    console.log(video)
}

// {
//     "category_id": "1001",
//     "video_id": "aaag",
//     "thumbnail": "https://i.ibb.co/DRxB1Wm/sunris.jpg",
//     "title": "Sunrise Reverie",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/yQFJ42h/ava.jpg",
//             "profile_name": "Ava Johnson",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "16950"
//     },
//     "description": "'Sunrise Reverie' by Ava Johnson takes listeners on a serene journey through tranquil melodies and soft harmonies. With 1.1K views, this track is perfect for morning relaxation or an evening wind-down. Ava's heartfelt lyrics and soothing voice create a sense of peace, making it a go-to for fans seeking calm and inspiration in their musical choices."
// }

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';

    if(videos.length === 0){
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
        <div class ='flex flex-col justify-center items-center'> 
        <img src = './design/icon.png'/>
        <h2 class = 'text-4xl font-bold my-5'> 
            Oops!! Sorry, There is no content here
        </h2>
        </div>
        `
        videos.appendChild(videosContainer)
    }else{
        videosContainer.classList.add('grid')
    }
    videos.forEach((video) => {
        
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
         <figure class="h-52 relative">
        <img class="h-full w-full object-cover"
        src=${video.thumbnail}
        alt="Shoes" />
        ${video.others.posted_date?.length === 0 ? "": `<span class =" absolute bottom-2 right-2 bg-black text-white rounded-md p-2 text-xs"> ${setTimeString(video.others.posted_date)}  </span> `

        }
        
        </figure>
        
        <div class=" px-0 py-2 flex gap-2">
            <div>
                <img class ="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class=" text-lg font-bold "> ${video.title} </h2>
                <div class= " flex items-center gap-2" >
                    <h4 class =" text-sm text-gray-800 font-normal "> ${video.authors[0].profile_name}  </h4>
                    ${video.authors[0].verified == true ? `<img class=' w-5 ' src = 'https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png' /> `: ''}
                </div>

                <p> <button onclick ="loadDetails('${video.video_id}')" class ='btn btn-sm my-2 btn-error '> Details <button> </p>
            </div>
         

        </div>
        `
        videosContainer.appendChild(card)

    })
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        
        const btnContainer = document.createElement('div')
        btnContainer.innerHTML = `
         <button id="btn-${item.category_id}" onclick = "loadCategoriesVideo(${item.category_id})" class="btn  text-xl font-semibold  btn-category">
            ${item.category}
         </button>
        `;
        categoriesContainer.appendChild(btnContainer)

    });
}
loadCategories()
loadVideos()
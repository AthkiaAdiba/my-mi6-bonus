

let selectedCategory = 1000;
let sortByView = false;

const sortButton = document.getElementById('sort-btn');

sortButton.addEventListener('click', () => {
    sortByView = true;
    fetchDataByCategoriesId(selectedCategory, sortByView);

})



const fetchCatagories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const allButtonData = data.data;
    // console.log(data.data);
    const buttonContainer = document.getElementById('btn-container');
    allButtonData.forEach(buttonData => {
        // console.log(buttonData)
       
        const dynamicButton = document.createElement('button');
        dynamicButton.classList = `btn-category btn  btn-ghost bg-slate-700 text-white text-lg`;
        dynamicButton.innerText = buttonData.category;
        dynamicButton.addEventListener('click', () => {
            fetchDataByCategoriesId(buttonData.category_id)
            const allButton = document.getElementsByClassName('btn-category');
            for(const button of allButton){
                button.classList.remove('bg-red-600');
            }
            dynamicButton.classList.add('bg-red-600')
        })
        buttonContainer.appendChild(dynamicButton);
    });

}




const fetchDataByCategoriesId = async(categoryId, sortByView) => {
    console.log(categoryId);
    selectedCategory = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    const allVideoData = data.data;
    // console.log(data.data)
    const cardContainer = document.getElementById('card-container');
    const errorElement = document.getElementById('error-element');

    if(sortByView){
        allVideoData.sort((a, b) => {
            totalViewStrFirst = a.others?.views;
            totalViewStrSecond = b.others?.views;
            totalViewStrFirstNumber = parseFloat(totalViewStrFirst.replace('k', '')) || 0;
            totalViewStrSecondNumber = parseFloat(totalViewStrSecond.replace('k', '')) || 0;
            return totalViewStrSecondNumber - totalViewStrFirstNumber;
        })
    }

    if(allVideoData.length === 0){
        errorElement.classList.remove('hidden');
    }
    else{
        errorElement.classList.add('hidden')
    }

    cardContainer.innerHTML = '';


    allVideoData.forEach((video) => {
        console.log(video);
        let verifiedBadge= '';
        if(video.authors[0].verified){
            verifiedBadge = `<img class="w-6 h-6" src="./images/verify.png" alt="">`
        }
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="Shoes" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${verifiedBadge}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(videoCard);

    })
}


fetchDataByCategoriesId(selectedCategory, sortByView);
fetchCatagories();
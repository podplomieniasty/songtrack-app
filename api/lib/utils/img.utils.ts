function getRandomProfilePicture() {
    return pfps[Math.floor(Math.random() * pfps.length)];
}

export {
    getRandomProfilePicture
}

const pfps = [
    'https://preview.redd.it/m0tp4ka64ne71.jpg?width=1080&crop=smart&auto=webp&s=0319d8ec66a58626225439543f70a5a12bf19416',
]
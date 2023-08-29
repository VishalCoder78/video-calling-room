const socket = io('/')
const videoContainer = document.getElementById('video_container')

const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});

const userName = prompt('Enter your name...')


const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

socket.emit('join-room', ROOM_ID, userName )

socket.on('user-connected', userId => {
    console.log('user connected:' + userId);
})

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetedata', () => {
        video.paly()
    })
    videoContainer.append(video)
}
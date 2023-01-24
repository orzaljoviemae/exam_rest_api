import Album from '../models/Album.js'
import Artist from '../models/Artist.js'

export const getAlbums = async (req, res) => {
    try {
        const albums = await Album
           .find({ artistId: req.params.artistId })
           .populate('artistId')
           .select('code albumName numberOfSongs year artistId')
        if (albums.length !== 0)
            res.status(200).json(albums)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getAlbum = async (req, res) => {
    try {
        const { id } = req.params
        const album = await Album.findById(id)
            .populate('artistId')
            .select('code albumName numberOfSongs year artistId')
        if (album)
            res.status(200).json(album)
        else (album)
            res.status(404).json({ error: 'resource not found '})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addAlbum = async (req, res) => {
    try {
        const { code, albumName, numberOfSongs, year } = req.body
        const artistId = req.params.artistId
        const newAlbum = await Album.create({
            code,
            albumName,
            numberOfSongs,
            year,
            artistId
        })
        const savedArtist = await newArtist.save()
        res.status(201).json({ id: savedArtist._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteAlbum = async (req, res) => {
    try {
        await Artist.deleteOne({
            artistId: req.params.artistId,
            _id: req.params.id
        })
        res.status(204).send()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateAlbum = async (req, res) => {
    try {
        const filter = {
            artistId: req.params.artistId,
            _id: req.params.id
        }
        const { version, year } = req.body
        const update = {
            code: code,
            albumName: albumName,
            numberOfSongs: numberOfSongs,
            year: year,
        }
        await Album.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

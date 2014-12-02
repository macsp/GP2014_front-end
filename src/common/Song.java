package common;

import java.util.ArrayList;
import java.util.List;

import edu.dei.gp.jpa.aux.DominantEmotion;

public class Song {
    int songId;
    String title;
    String youtubeId;
    String fileName;
    String lyric;
    String artist;
    float arousal;
    float valence;
    DominantEmotion dominantEmotion;

    List<Emotion> emotions = new ArrayList<Emotion>();

    public Song(String artist, String title, String youtubeId, String lyric, float arousal, float valence,
	    DominantEmotion dominantEmotion) {
	setArtist(artist);
	setTitle(title);
	setYoutubeId(youtubeId);
	setLyric(lyric);
	this.arousal = arousal;
	this.valence = valence;
	this.dominantEmotion = dominantEmotion;
    }

    public void setEmotions(List<Emotion> emotions) {
	this.emotions = emotions;
    }

    public List<Emotion> getEmotions() {
	return emotions;
    }

    public int getSongId() {
	return songId;
    }

    public void setSongId(int songId) {
	this.songId = songId;
    }

    public String getTitle() {
	return title;
    }

    public void setTitle(String title) {
	this.title = title;
    }

    public String getYoutubeId() {
	return youtubeId;
    }

    public void setYoutubeId(String youtubeId) {
	this.youtubeId = youtubeId;
    }

    public String getFileName() {
	return fileName;
    }

    public void setFileName(String fileName) {
	this.fileName = fileName;
    }

    public String getLyric() {
	return lyric;
    }

    public void setLyric(String lyric) {
	this.lyric = lyric;
    }

    public String getArtist() {
	return artist;
    }

    public void setArtist(String artist) {
	this.artist = artist;
    }


}

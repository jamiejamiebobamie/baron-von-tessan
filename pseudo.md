Animation Class
Base class
	transform:
		p.lerp(from,to,lerpSpeed)
     options:
    	 translate: (X and Y, just X, just Y)
         rotate: (Radians or degrees)
         scale (Uniform, by X, by Y, by X and Y, but not uniform or the same speed)
         opacity (requires this.color to be set on UI object)
     bool isFinished // is true if the animation is done (from == to)

Children
    StartAnimation
        p.lerp(newValue,regularPosition,lerpSpeed)
    ViewAnimation
       bool shouldLoop // is true if the animation should continue playing once finished.
	   flip-flop between:
            p.lerp(regularPosition+difference1,regularPosition+difference2,lerpSpeed)
        and
            p.lerp(regularPosition+difference2,regularPosition+difference1,lerpSpeed)
    EndAnimation
        p.lerp(regularPosition,newValue,lerpSpeed)

Should EndAnimations' isFinished bool control when the viewIndex is changed?
The canvas should cover the entire windowWidth and windowHeight to allow for elements
    to translate from offscreen into position or from position to offscreen.

	module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
  	clean: {
	  build: {
	    src: [ 'build' ]
	  }
	}, 	
    sass: {
    	options: {
		  	style: 'nested',
		  	sourcemap: true
		},
	    dist: {		  
	      files: [{
	        expand: true,
	        cwd: 'app/scss',
	        src: ['*.scss'],
	        dest: 'build/css',
	        ext: '.css'
	      }]
	    }
  	}, 
  	copy: {  		
	    build: {
	        cwd: 'app',
	        src: [ '**/*', '!**/scss/**','!**/svg/**'],
	        dest: 'build',
	        expand: true
	    },
	    html: {
	      	cwd: 'app',
	        src: [ '**/*.html'],
	        dest: 'build',
	        expand: true
    	},
    	js:	{
    		cwd: 'app',
	        src: [ 'js/*.js'],
	        dest: 'build',
	        expand: true
    	},
    	img: {
    		cwd: 'app',
	        src: [ 'img/**'],
	        dest: 'build',
	        expand: true
    	}
    },
  	autoprefixer: {
  		options: {
        	browsers: ['last 2 versions'],
        	sourcemap: true
	    },
	    files: {
	        expand: true,
		    flatten: true,
		    cwd: 'build/css',
		    src: ['*.css'],
		    dest: 'build/css'
	    }
  	},	
  	svgstore: {
    	options: {
    		svg: {
    			style: 'display:none;'
    		}
    	},
    	dist : {
	      	files: {
	        	'build/app.svg': ['app/svg/*.svg'],
	      	},
    	},
  	},
  	includes: {
      dist: {
        cwd: 'build',
        src: [ '**/*.html' ],
        dest: 'build',        
      }
    },
    watch: {
	  scss: {
	    files: 'app/scss/*.scss',
	    tasks: ['build_sass'],
	    options: {
	      livereload: true
	    }
	  },
	  html: {
	    files: 'app/**.html',
	    tasks: ['build_html'],
	    options: {
	      livereload: true
	    }
	  },
	  svg: {
	    files: 'app/svg/*.svg',
	    tasks: ['build_svg'],
	    options: {
	      livereload: true
	    }
	  },
	  js: {
	    files: 'app/js/*.js',
	    tasks: ['build_js'],
	    options: {
	      livereload: true
	    }
	  },
	  img: {
	  	files: 'app/img/**',
	    tasks: ['build_img'],
	    options: {
	      livereload: true
	    }
	  }
	},
	connect: {
	    server: {
	        options: {	        	
	        	host: 'localhost',
	        	livereload: true,
	            keepalive: true,
	            open: {
	            	target: 'http://localhost:8000/build'
	            }
	        }
	    }
	}
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-sass');  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
 
  grunt.registerTask('serve', ['build','connect']);
  grunt.registerTask('build_sass',['sass','autoprefixer']);
  grunt.registerTask('build_html',['copy:html','includes']);
  grunt.registerTask('build_svg',['svgstore','build_html']);
  grunt.registerTask('build_js',['copy:js']);
  grunt.registerTask('build_img',['copy:img']);
  grunt.registerTask('build', ['clean','sass','autoprefixer','svgstore','copy:build','includes']);
  grunt.registerTask('default', ['build']);
};
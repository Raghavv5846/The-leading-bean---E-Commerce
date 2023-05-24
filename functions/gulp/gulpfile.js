import gulp from 'gulp';

import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev'
import uglify from 'gulp-uglify';
import imagemin,{gifsicle} from 'gulp-imagemin';
import clean from 'gulp-clean';

gulp.task('css', function(done){
    console.log('minifying css...');

     gulp.src('../assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('../../public/'))
    .pipe(rev.manifest(rev.manifest({
        cwd: '../../public/',
        merge: true
    })))
    .pipe(gulp.dest('../../public/'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('../assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('../../public/'))
    .pipe(rev.manifest({
        cwd: '../../public/',
        merge: true
    }))
    .pipe(gulp.dest('../../public/'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('../assets/**/*.+(png|jpg|svg|jpeg)')
    .pipe(imagemin([
        gifsicle()
    ]))
    .pipe(rev())
    .pipe(gulp.dest('../../public/'))
    .pipe(rev.manifest({
        cwd: '../../public/',
        merge: true
    }))
    .pipe(gulp.dest('../../public/'));
    done();
});


// empty he public/assets directory
gulp.task('clean:assets', function(){
    return gulp.src('../public/', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});
import {exifDbLoader,newLogger} from './connect.js';

const main=(args)=>{

  const opts={
    endPoint: 's3.amazonaws.com',
    bucket: 'waldo-recruiting',
    dbUrl:'mongodb://localhost:27017/test',
    concurrency:3,
    skipOld:false,
    verbose:true,
  };

  args.forEach(arg=>{
    const match=arg.match(/(.*?)=(.*)/);
    if(match) {
      const [key,value]=match;
      opts[key]=value;
    }
  });

  let {endPoint,bucket,dbUrl,concurrency,skipOld,verbose}=opts;

  concurrency=parseInt(concurrency);
  skipOld=!!skipOld;

  const bucketSpec={endPoint,bucket};
  const dbSpec={dbUrl};
  const spec={concurrency,skipOld};
  const logger=verbose && newLogger();

  exifDbLoader(bucketSpec,dbSpec,spec,logger);
};

main(process.argv.splice(2))



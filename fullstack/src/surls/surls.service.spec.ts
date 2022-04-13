import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { SurlsService } from './surls.service';
import { SurlsModule } from './surls.module';
import { Surl } from './surl.model';

const surlsArray = [
  {
    surl: '30ORqw',
    longUrl: 'https://www.google.com',
    kword: ''
  },
  {
    surl: 'firstName #1',
    longUrl: 'lastName #1',
    kword: ''
  },
];

const oneSurl = {
  surl: '30ORqw',
  longUrl: 'https://www.google.com',
  kword: ''
};

describe('SurlsService', () => {
  let service: SurlsService;
  let surlModel: typeof Surl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ SurlsService , { provide: getModelToken(Surl), useValue:{
        findAll: jest.fn(() => surlsArray),
        findOne: jest.fn(() => oneSurl),
        create: jest.fn(() => oneSurl),
        remove: jest.fn(),
        destroy: jest.fn(() => oneSurl),
      }}],
    }).compile();

    service = module.get<SurlsService>(SurlsService);
    surlModel = module.get<typeof Surl>(getModelToken(Surl));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return long url', async () => {
    const longUrl = await service.getLongUrl('30ORqw');
    expect(longUrl).toBe('https://www.google.com');
  })

  it('should tranform long url to short url', async () => {
    const shortUrl = await service.LongToShort('https://www.google.com');
    expect(shortUrl).toBe('30ORqw');
  })

  it('should be valid long url', async () => {
    const isValid = await service.isValidLongUrl('https://www.google.com');
    expect(isValid).toBe(true);
  })
});

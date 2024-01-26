import { NGXLogger } from 'ngx-logger';

export const generateMockLogger = (): NGXLogger => {
  const logger = jasmine.createSpyObj<NGXLogger>('Logger', ['error']);
  logger.error.and.returnValue();
  return logger;
};

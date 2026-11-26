import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LIBRARY_CONFIGS, LibraryNotConfiguredError, configuredConfig, libraryAvailability, networkArgs, withLibrary } from '../index.js';

test('library availability reports the shipped demo library as configured', () => {
  const availability = libraryAvailability();
  assert.deepEqual(Object.keys(availability).sort(), ['demo', 'private']);
  assert.equal(availability.demo.configured, true);
  assert.equal(availability.private.configured, fs.existsSync(LIBRARY_CONFIGS.private));
});

test('a missing Private library config fails with setup guidance, not a Python traceback', { skip: fs.existsSync(LIBRARY_CONFIGS.private) && 'a Private library is configured here' }, () => {
  assert.throws(() => withLibrary('private', () => configuredConfig()), (error) => {
    assert.ok(error instanceof LibraryNotConfiguredError);
    assert.equal(error.code, 'library-not-configured');
    assert.equal(error.statusCode, 409);
    assert.match(error.message, /Private library is not set up yet/);
    assert.match(error.message, /Demo library works without setup/);
    return true;
  });
});

test('the demo library config passes the guard and reaches Python arguments', () => {
  assert.equal(withLibrary('demo', () => configuredConfig()), LIBRARY_CONFIGS.demo);
  const args = withLibrary('demo', () => networkArgs());
  assert.equal(args[0], `--config=${LIBRARY_CONFIGS.demo}`);
});
